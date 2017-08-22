using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineShop.DAL;
using OnlineShop.Filters;
using OnlineShop.Models;
using PagedList.Mvc;
using PagedList;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using System.Diagnostics;

namespace OnlineShop.Controllers
{
    [AjaxValidateAntiForgeryToken]
    [InitializeSimpleMembership]
    public class ItemsController : Controller
    {
        private IUnitOfWork unitOfWork;
        public ItemsController()
        {
            unitOfWork = new UnitOfWork();
        }
        public ItemsController(IUnitOfWork repository)
        {
            unitOfWork = repository;
        }

        public class Sort
        {
            public string property { get; set; }
            public string direction { get; set; }
        }

        // Read
        [HttpPost]
        public JsonResult Index(Guid? id, int? page, int? start, int? limit, string sort, string filter)
        {
            try
            {
                string property = "";
                string direction = "";
                string sortByCategory = "";
                bool allCategory =  true;
                string pattern;
                Regex regex;
                Match match;

                if (filter != null)
                {
                    pattern = "{\"property\":\"SortByCategory\",\"value\":\"((\\\\[\\w, ]+)+)\"}";
                    regex = new Regex(pattern);
                    match = regex.Match(filter);
                    if (match.Success)
                    {
                        sortByCategory = match.Groups[1].Value;
                    }
                    sortByCategory = System.Text.RegularExpressions.Regex.Unescape(sortByCategory);
                    if (sortByCategory != "Все категории")
                        allCategory = false;
                }

                if (sort != null)
                {
                    pattern = "{\"property\":\"(\\w+)\",\"direction\":\"(\\w+)\"}";
                    regex = new Regex(pattern);
                    match = regex.Match(sort);
                    if (match.Success)
                    {
                        property = match.Groups[1].Value;
                        direction = match.Groups[2].Value;
                    }
                }
                IEnumerable<Item> allItems;
                switch (property)
                {
                    case "Price":
                        if (allCategory)
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Price));
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Price));
                            break;
                        }
                        else
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Price), filter: q => q.Category == sortByCategory);
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Price), filter: q => q.Category == sortByCategory);
                            break;
                        }
                    case "Category":
                        if (allCategory)
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Category));
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Category));
                            break;
                        }
                        else
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Category), filter: q => q.Category == sortByCategory);
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Category), filter: q => q.Category == sortByCategory);
                            break;
                        }
                    default:
                        if (allCategory)
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Name));
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Name));
                            break;
                        }
                        else
                        {
                            if (direction == "DESC")
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderByDescending(d => d.Name), filter: q => q.Category == sortByCategory);
                            else
                                allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Name), filter: q => q.Category == sortByCategory);
                            break;
                        }
                }
                int itemsCount = allItems.Count();
                int pageSize = (limit ?? 5);
                int pageNumber = (page ?? 1);
                var list = allItems.ToList().ToPagedList(pageNumber, pageSize);

                return this.Json(new { success = true, total = itemsCount, data = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Destroy
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Delete(Guid id)
        {
            try
            {
                Item item = unitOfWork.ItemRepository().GetByID(id);
                unitOfWork.ItemRepository().Delete(item);
                unitOfWork.Save();

                return this.Json(new { success = true });
            }
            catch
            {
                return this.Json(new { success = false });
            }
        }

        // Create
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Create(Item item)
        {
            try
            {
                item.ItemId = Guid.NewGuid();
                unitOfWork.ItemRepository().Insert(item);
                unitOfWork.Save();

                return this.Json(new { success = true, data = item }, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.DenyGet);
            }
        }

        // Update
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Update(Item item)
        {
            try
            {
                unitOfWork.ItemRepository().Update(item);
                unitOfWork.Save();

                return this.Json(new { success = true }, JsonRequestBehavior.DenyGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.DenyGet);
            }
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}
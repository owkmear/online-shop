using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineShop.DAL;
using OnlineShop.Filters;
using PagedList.Mvc;
using PagedList;
using WebMatrix.WebData;
using System.Web.Security;
using OnlineShop.Models;
using System.Diagnostics;

namespace OnlineShop.Controllers
{
    [InitializeSimpleMembership]
    public class TestController : Controller
    {

        //private UnitOfWork unitOfWork = new UnitOfWork();
        private IUnitOfWork unitOfWork;

        public TestController()
        {
            unitOfWork = new UnitOfWork();
        }
        public TestController(IUnitOfWork repository)
        {
            unitOfWork = repository;
        }

        //[HttpPost]
        public JsonResult Index()
        {
            IEnumerable<Item> allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Name));
            return this.Json(new { success = allItems.Count()}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Index2()
        {
            IEnumerable<Item> allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Name));          
            return this.Json(new { success = allItems.Count()}, JsonRequestBehavior.AllowGet);
        }
    }
}
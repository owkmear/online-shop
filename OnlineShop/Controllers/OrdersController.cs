using System;
using System.Collections.Generic;
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
using System.Text.RegularExpressions;

namespace OnlineShop.Controllers
{
    [AjaxValidateAntiForgeryToken]
    [InitializeSimpleMembership]
    public class OrdersController : Controller
    {
        private IUnitOfWork unitOfWork;
        public OrdersController()
        {
            unitOfWork = new UnitOfWork();
        }
        public OrdersController(IUnitOfWork repository)
        {
            unitOfWork = repository;
        }
        public class Cat
        {
            public string Category { get; set; }
        }

        // Orders/CancelOrder
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult CancelOrder(Guid? OrderId)
        {
            try
            {
                Order order = unitOfWork.OrderRepository().GetByID(OrderId);

                // Проверка соответствия запрашиваемого заказа пользователю
                string currentUser = User.Identity.Name;
                int userId = WebSecurity.GetUserId(currentUser);
                Customer currentСustomer = unitOfWork.CustomerRepository().Get(d => d.UserId == userId).First();
                    if (currentСustomer.CustomerId != order.CustomerId)
                        throw new Exception("Отменяемый заказ Вам не принадлежит");

                if (order.Status == "Новый")
                {
                    unitOfWork.OrderRepository().Delete(order);
                    unitOfWork.Save();
                    return this.Json(new { success = true });
                }
                else
                    throw new Exception("Заказ имеет статус не \"Новый\"");
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult GetCustomerOrders(Guid? id, int? page, int? start, int? limit, string sort, string filter)
        {
            try
            {
                string currentUser = User.Identity.Name;
                int userId = WebSecurity.GetUserId(currentUser);
                Customer customer = unitOfWork.CustomerRepository().Get(d => d.UserId == userId).First();

                var customerOrders = unitOfWork.OrderRepository().Get(d => d.CustomerId == customer.CustomerId).Where(x => x.Status != null);
                int ordersCount = customerOrders.Count();
                int pageSize = (limit ?? 5);
                int pageNumber = (page ?? 1);
                IPagedList<Order> list = customerOrders.ToList().ToPagedList(pageNumber, pageSize);

                return this.Json(new { success = true, total = ordersCount, data = list }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult GetCustomerItems(Guid? id, int? page, int? start, int? limit, string sort, string filter)
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

                Order basket = GetBasket();
                var basketPositions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);

                List<CustomerItem> customerItemsList = new List<CustomerItem>();
                foreach (var item in list)
                {
                    CustomerItem customerItem = new CustomerItem();
                    customerItem.ItemId = item.ItemId;
                    customerItem.Name = item.Name;
                    customerItem.Code = item.Code;
                    customerItem.Category = item.Category;
                    customerItem.Price = item.Price;
                    customerItem.Count = 0;

                    foreach (Position basketPosition in basketPositions)
                        if (customerItem.ItemId == basketPosition.ItemId)
                            customerItem.Count = basketPosition.ItemsCount;

                    customerItemsList.Add(customerItem);
                }
                return this.Json(new { success = true, total = itemsCount, data = customerItemsList }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        // Orders/GetAllCategories
        [AllowAnonymous]
        [HttpPost]
        public JsonResult GetAllCategories()
        {
            try
            {
                var allItems = unitOfWork.ItemRepository().Get(orderBy: q => q.OrderBy(d => d.Name));
                List<Cat> answer = new List<Cat>();
                HashSet<string> uniqueCategories = new HashSet<string>();
                foreach (Item item in allItems)
                {
                    uniqueCategories.Add(item.Category);
                }
                foreach (string category in uniqueCategories)
                {
                    answer.Add(new Cat() { Category = category });
                }

                answer.Add(new Cat() { Category = "Все категории" });
                return this.Json(new { success = true, data = answer});
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/GetBasketInformation
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult GetBasketInformation()
        {
            try
            {
                int itemsCount = 0;
                int sumPriceItems = 0;
                Order basket = GetBasket();
                var positions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);
                foreach (Position position in positions)
                {
                    itemsCount += position.ItemsCount;
                    Item item = unitOfWork.ItemRepository().Get(d => d.ItemId == position.ItemId).First();
                    sumPriceItems += position.ItemsCount * item.Price;
                }
                return this.Json(new { success = true, data = new { total = itemsCount, sum = sumPriceItems }});
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/Index
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Index(Guid? id, int? page, int? start, int? limit)
        {
            try
            {
                SimpleMembershipProvider provider = (SimpleMembershipProvider) Membership.Provider;

                var allItems = unitOfWork.OrderRepository().Get(orderBy: q => q.OrderBy(d => d.OrderDate)).Where(x => x.Status != null);
                int itemsCount = allItems.Count();

                int pageSize = (limit ?? 5);
                int pageNumber = (page ?? 1);
                var list = allItems.ToList().ToPagedList(pageNumber, pageSize);

                List<ManagerOrderInfo> managerOrdersList = new List<ManagerOrderInfo>();

                // TODO: Нельзя в цикле использовать SQL-запросы
                foreach (var item in list)
                {
                    ManagerOrderInfo managerOrderInfo = new ManagerOrderInfo();
                    managerOrderInfo.OrderId = item.OrderId;
                    managerOrderInfo.OrderDate = item.OrderDate;
                    managerOrderInfo.ShipmentDate = item.ShipmentDate;
                    managerOrderInfo.OrderNumber = item.OrderNumber;
                    managerOrderInfo.Status = item.Status;
                    Customer customer = unitOfWork.CustomerRepository().Get(d => d.CustomerId == item.CustomerId).First();
                    managerOrderInfo.Login = provider.GetUserNameFromId(customer.UserId);
                    managerOrdersList.Add(managerOrderInfo);
                }

                return this.Json(new { success = true, total = itemsCount, data = managerOrdersList }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        // Orders/ConfirmOrder
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult ConfirmOrder(Guid? OrderId, DateTime ShipmentDate)
        {
            try
            {
                Order order = unitOfWork.OrderRepository().GetByID(OrderId);
                if (order.Status == "Новый")
                {
                    order.Status = "Выполняется";

                    order.ShipmentDate = ShipmentDate;
                    unitOfWork.Save();
                    return this.Json(new { success = true });
                }
                else
                    throw new Exception("Заказ имеет статус не 'Новый'");
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/CloseOrder
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult CloseOrder(Guid? OrderId)
        {
            try
            {
                Order order = unitOfWork.OrderRepository().GetByID(OrderId);
                if (order.Status == "Выполняется")
                {
                    order.Status = "Выполнен";
                    unitOfWork.Save();
                    return this.Json(new { success = true });
                }
                else
                    throw new Exception("Заказ имеет статус не 'Выполняется'");
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/AddItemToBasket
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult AddItemToBasket(Guid ItemId)
        {
            try
            {
                Order basket = GetBasket();

                var basketPositions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);
                bool flag = false;
                foreach (Position basketPosition in basketPositions)
                {
                    if (basketPosition.ItemId == ItemId)
                    {
                        basketPosition.ItemsCount++;
                        flag = true;
                        break;
                    }
                }
                if (flag == false)
                {
                    Position basketPosition = new Position();
                    basketPosition.PositionId = Guid.NewGuid();
                    basketPosition.OrderId = basket.OrderId;
                    basketPosition.ItemId = ItemId;
                    basketPosition.ItemsCount = 1;
                    unitOfWork.PositionRepository().Insert(basketPosition);
                }
                unitOfWork.Save();
                return this.Json(new { success = true });
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Получение корзины заказчика
        [OnlineShopAuthorize(Roles = "Manager")]
        private Order GetBasket()
        {
            string currentUser = User.Identity.Name;
            int userId = WebSecurity.GetUserId(currentUser);
            Customer customer = unitOfWork.CustomerRepository().Get(d => d.UserId == userId).First();

            // Получаем заказ текущего заказчика с состоянием NULL
            var query = unitOfWork.OrderRepository().Get(d => d.CustomerId == customer.CustomerId && d.Status == null);
            Order basket;
            if (query.Count() == 0)
            {

                // Создание корзины
                basket = new Order();
                basket.OrderId = Guid.NewGuid();
                basket.CustomerId = customer.CustomerId;
                basket.OrderDate = DateTime.Now;
                basket.ShipmentDate = null;
                basket.OrderNumber = 0;
                basket.Status = null;

                unitOfWork.OrderRepository().Insert(basket);
                unitOfWork.Save();
            }
            else
            {
                basket = query.First();
            }
            return basket;
        }

        // Orders/AddItemToBasket
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult GetBasketPositions(Guid? id, int? page, int? start, int? limit)
        {
            try
            {
                Order basket = GetBasket();
                var positions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);

                List<BasketPosition> basketPositions = new List<BasketPosition>();
                foreach (Position position in positions)
                {
                    BasketPosition basketPosition = new BasketPosition();
                    basketPosition.PositionId = position.PositionId;
                    basketPosition.Count = position.ItemsCount;

                    Item item = unitOfWork.ItemRepository().Get(d => d.ItemId == position.ItemId).First();
                    basketPosition.Name = item.Name;
                    basketPosition.Code = item.Code;
                    basketPosition.Price = item.Price;
                    basketPositions.Add(basketPosition);
                }

                unitOfWork.Save();
                return this.Json(new { success = true, data = basketPositions });
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/DeleteAllPositionFromBasket
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult DeleteAllPositionFromBasket(Guid PositionId)
        {
            try
            {
                Position position = unitOfWork.PositionRepository().GetByID(PositionId);
                Order basket = GetBasket();
                if (basket.OrderId != position.OrderId)
                    throw new Exception("Позиция не в корзине");
                unitOfWork.PositionRepository().Delete(PositionId);

                unitOfWork.Save();
                return this.Json(new { success = true });
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/DeletePositionFromBasket
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult DeletePositionFromBasket(Guid ItemId)
        {
            try
            {
                Order basket = GetBasket();
                var basketPositions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);
                foreach (Position basketPosition in basketPositions)
                    if (basketPosition.ItemId == ItemId)
                    {
                        if (basketPosition.ItemsCount == 1)
                        {
                            unitOfWork.PositionRepository().Delete(basketPosition.PositionId);
                        }
                        else
                        {
                            basketPosition.ItemsCount--;
                        }
                        unitOfWork.Save();
                        return this.Json(new { success = true });
                    }
                throw new Exception("Позиция не в корзине");
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Orders/CreateOrder
        [OnlineShopAuthorize(Roles = "Customer")]
        [HttpPost]
        public JsonResult CreateOrder()
        {
            try
            {
                Order basket = GetBasket();

                var basketPositions = unitOfWork.PositionRepository().Get(d => d.OrderId == basket.OrderId);

                if (basketPositions.Count() == 0)
                    throw new Exception("В корзине нет товаров");
                basket.Status = "Новый";
                basket.OrderDate = DateTime.Now;

                basket.OrderNumber = GenerateOrderNumber();

                unitOfWork.Save();
                return this.Json(new { success = true });
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }

        // Генерация уникального шестизначного номера
        [OnlineShopAuthorize(Roles = "Manager")]
        private int GenerateOrderNumber()
        {
            Random rand = new Random();
            int temp;
            bool flag;
            var allOrders = unitOfWork.OrderRepository().Get(orderBy: q => q.OrderBy(d => d.OrderNumber));
            do
            {
                temp = rand.Next(100000, 999999);
                flag = false;
                foreach (Order order in allOrders)
                    if (order.OrderNumber == temp)
                    {
                        flag = true;
                        break;
                    }
            }
            while (flag == true);
            return temp;
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }

        public class BasketPosition
        {
            public Guid PositionId { get; set; } // ID
            public string Name { get; set; } // Наименование товара
            public string Code { get; set; } // Код товара
            public int Price { get; set; } // Цена за единицу товара
            public int Count { get; set; } // Количество заказанного товара
        }

        public class ManagerOrderInfo
        {
            public Guid OrderId { get; set; }
            public string Login { get; set; }
            public DateTime OrderDate { get; set; }
            public DateTime? ShipmentDate { get; set; }
            public int OrderNumber { get; set; }
            public string Status { get; set; }
        }
        public class CustomerItem
        {
            public Guid ItemId { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public int Price { get; set; }
            public string Category { get; set; }
            public int Count { get; set; }
        }
    }
}

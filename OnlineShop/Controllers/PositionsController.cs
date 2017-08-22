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

namespace OnlineShop.Controllers
{
    [AjaxValidateAntiForgeryToken]
    [InitializeSimpleMembership]
    public class PositionsController : Controller
    {
        private IUnitOfWork unitOfWork;
        public PositionsController()
        {
            unitOfWork = new UnitOfWork();
        }
        public PositionsController(IUnitOfWork repository)
        {
            unitOfWork = repository;
        }

        // Positions/GetPositionsByOrderId
        [OnlineShopAuthorize(Roles = "Manager, Customer")]
        [HttpPost]
        public JsonResult GetPositionsByOrderId(Guid? OrderId)
        {
            try
            {
                var orderPositions = unitOfWork.PositionRepository().Get(d => d.OrderId == OrderId);
                List<ManagerPositionInfo> positionInfoList = new List<ManagerPositionInfo>();

                Order order = unitOfWork.OrderRepository().GetByID(OrderId);

                // Проверка соответствия запрашиваемого заказа пользователю
                string currentUser = User.Identity.Name;
                int userId = WebSecurity.GetUserId(currentUser);
                SimpleRoleProvider roles = (SimpleRoleProvider)Roles.Provider;
                string userRole = roles.GetRolesForUser(currentUser).First();
                if (userRole == "Customer")
                {
                    Customer currentСustomer = unitOfWork.CustomerRepository().Get(d => d.UserId == userId).First();
                    if (currentСustomer.CustomerId != order.CustomerId)
                        throw new Exception("Запрашиваемый заказ Вам не принадлежит");
                }

                Customer customer = unitOfWork.CustomerRepository().GetByID(order.CustomerId);
                ManagerCustomerInfo customerInfo = new ManagerCustomerInfo();
                customerInfo.Name = customer.Name;
                customerInfo.Address = customer.Address;
                customerInfo.Discount = customer.Discount;

                foreach (var position in orderPositions)
                {
                    ManagerPositionInfo positionInfo = new ManagerPositionInfo();
                    positionInfo.ItemsCount = position.ItemsCount;

                    // Получение данных о товаре
                    Item item = unitOfWork.ItemRepository().GetByID(position.ItemId);
                    positionInfo.Name = item.Name;
                    positionInfo.Price = item.Price;

                    positionInfoList.Add(positionInfo);
                }
                return this.Json(new { success = true, data = positionInfoList, info = customerInfo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return this.Json(new { success = false, error = e.Message });
            }
        }
        public class ManagerPositionInfo
        {
            public int ItemsCount { get; set; } // Количество заказанного товара
            public string Name { get; set; } // Наименование товара
            public int Price { get; set; } // Цена за единицу товара
        }
        public class ManagerCustomerInfo
        {
            public string Name { get; set; } // Наименование заказчика
            public string Address { get; set; } // Адрес заказчика
            public int Discount { get; set; } // Скидка заказчика
        }
    }
}

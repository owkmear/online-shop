using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnlineShop.DAL;
using OnlineShop.Models;
using PagedList.Mvc;
using PagedList;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using System.Web.Security;
using OnlineShop.Filters;
using System.Transactions;
using System.Diagnostics;

namespace OnlineShop.Controllers
{
    [AjaxValidateAntiForgeryToken]
    [InitializeSimpleMembership]
    public class CustomersController : Controller
    {
        private IUnitOfWork unitOfWork;
        public CustomersController()
        {
            unitOfWork = new UnitOfWork();
        }
        public CustomersController(IUnitOfWork repository)
        {
            unitOfWork = repository;
        }

        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult CreateAccount(string Address, string Code, string Discount, string Name, string UserName, string Password, string ConfirmPassword)
        {
            try
            {
                    SimpleRoleProvider roles = (SimpleRoleProvider)Roles.Provider;
                    RegisterModel model = new RegisterModel();
                    model.UserName = UserName;
                    model.Password = Password;
                    model.ConfirmPassword = ConfirmPassword;
                    WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
                    roles.AddUsersToRoles(new[] { model.UserName }, new[] { "Customer" });

                    Customer customer = new Customer();
                    customer.Address = Address;
                    customer.Code = Code;
                    customer.Discount = Int32.Parse(Discount);
                    customer.Name = Name;
                    customer.CustomerId = Guid.NewGuid();
                    customer.UserId = WebSecurity.GetUserId(model.UserName);
                    unitOfWork.CustomerRepository().Insert(customer);
                    unitOfWork.Save();

                    return this.Json(new { success = true });
            }
            catch (Exception e)
            {
                List<string> ErrorList = new List<string>();
                ErrorList.Add(e.Message);
                return this.Json(new { success = false, errors = ErrorList });
            }
        }
       
        // Read
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Index(Guid? id, int? page, int? start, int? limit)
        {
            try
            {
                SimpleMembershipProvider provider = (SimpleMembershipProvider) Membership.Provider;

                // Поиск всех записей
                var allItems = unitOfWork.CustomerRepository().Get(orderBy: q => q.OrderBy(d => d.Name));
                int itemsCount = allItems.Count();
                int pageSize = (limit ?? 5);
                int pageNumber = (page ?? 1);
                var list = allItems.ToList().ToPagedList(pageNumber, pageSize);

                List<CustomerWithLogin> listWithLogins = new List<CustomerWithLogin>();
                foreach (var item in list)
                {
                    CustomerWithLogin customerWithLogin = new CustomerWithLogin();
                    customerWithLogin.Address = item.Address;
                    customerWithLogin.Code = item.Code;
                    customerWithLogin.CustomerId = item.CustomerId;
                    customerWithLogin.Discount = item.Discount;
                    customerWithLogin.Name = item.Name;
                    customerWithLogin.UserId = item.UserId;
                    customerWithLogin.Login = provider.GetUserNameFromId(item.UserId);
                    listWithLogins.Add(customerWithLogin);
                }

                return this.Json(new { success = true, total = itemsCount, data = listWithLogins }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return this.Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }
        
        // Destroy
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Delete(Guid id)
        {
            try
            {

                Customer customer = unitOfWork.CustomerRepository().GetByID(id);
                int userId = customer.UserId;
                unitOfWork.CustomerRepository().Delete(customer);
                unitOfWork.Save();

                SimpleMembershipProvider membership = (SimpleMembershipProvider)Membership.Provider;
                string userName = membership.GetUserNameFromId(userId);

                if (Roles.GetRolesForUser(userName).Count() > 0)
                {
                    Roles.RemoveUserFromRoles(userName, Roles.GetRolesForUser(userName));
                }
                membership.DeleteAccount(userName);
                membership.DeleteUser(userName, true);

                return this.Json(new { success = true });
            }
            catch
            {
                return this.Json(new { success = false });
            }
        }

        // Update
        [OnlineShopAuthorize(Roles = "Manager")]
        [HttpPost]
        public JsonResult Update(Customer customer)
        {
            try
            {
                unitOfWork.CustomerRepository().Update(customer);
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
        public class CustomerWithLogin
        {
            public Guid CustomerId { get; set; }
            public int UserId { get; set; }
            public string Login { get; set; }
            public string Name { get; set; }
            public string Code { get; set; }
            public string Address { get; set; }
            public int Discount { get; set; }
        }
    }
}

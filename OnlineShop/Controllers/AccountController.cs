using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using OnlineShop.Filters;
using OnlineShop.Models;
using System.Web;
using System.Diagnostics;
using OnlineShop.DAL;


namespace OnlineShop.Controllers
{
    [Authorize]
    [InitializeSimpleMembership]
    public class AccountController : Controller
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        //
        // GET: /Account/FillDatabase
        [HttpGet]
        [AllowAnonymous]
        public JsonResult FillDatabase()
        {
            try
            {
                SimpleRoleProvider roles = (SimpleRoleProvider)Roles.Provider;

                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), Code = "07-2016-AA14", Name = "Бананы", Price = 7350, Category = "Фрукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("cf54cca2-2c07-42fc-89b8-48d32fd4d3aa"), Code = "07-2016-AB14", Name = "Томаты", Price = 8900, Category = "Фрукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("9f48e3f1-e711-43c1-bd43-d2c05b171bb9"), Code = "07-2016-AC14", Name = "Персики", Price = 11590, Category = "Фрукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("dcc7f386-9230-4c7d-a284-f51727a593ef"), Code = "07-2016-AD14", Name = "Груши", Price = 18900, Category = "Фрукты" });

                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("a015c172-041d-4b95-b3e6-888f408853b1"), Code = "07-2016-AE14", Name = "Салат", Price = 5550, Category = "Овощи" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("dd100111-1378-45ef-be2e-b664e35bb24f"), Code = "07-2016-AF14", Name = "Зелень", Price = 7900, Category = "Овощи" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("975521f1-e643-466b-88f8-d8c481bf663b"), Code = "07-2016-AG14", Name = "Кинза", Price = 3900, Category = "Овощи" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("00e405a3-3b28-4f59-9aef-ba00cb229d51"), Code = "07-2016-AH14", Name = "Лук", Price = 6500, Category = "Овощи" });
                
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("24c1c7f2-0b3b-4343-8524-43e2cd89146f"), Code = "07-2016-AI14", Name = "Сливки", Price = 5020, Category = "Молочные продукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("5c3b2308-9851-4dd8-9cdd-d510ecaa3a23"), Code = "07-2016-AJ14", Name = "Молоко", Price = 7460, Category = "Молочные продукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("88250daa-2a4b-486c-8e6b-e018bfefc705"), Code = "07-2016-AK14", Name = "Сметана", Price = 7640, Category = "Молочные продукты" });
                unitOfWork.ItemRepository().Insert(new Item() { ItemId = new Guid("a47bef53-e9e4-4a1b-9ae6-1ba6e469efe0"), Code = "07-2016-AL14", Name = "Йогурт", Price = 3530, Category = "Молочные продукты" });

                // Добавление пользователя user1
                RegisterModel modelUser1 = new RegisterModel();
                modelUser1.UserName = "user1";
                modelUser1.Password = "123456";
                modelUser1.ConfirmPassword = "123456";
                WebSecurity.CreateUserAndAccount(modelUser1.UserName, modelUser1.Password);
                roles.AddUsersToRoles(new[] { modelUser1.UserName }, new[] { "Customer" });
                int IdUser1 = WebSecurity.GetUserId(modelUser1.UserName);
                unitOfWork.CustomerRepository().Insert(new Customer() { CustomerId = new Guid("74b8c8d2-601b-42f4-9755-4362a6259771"), UserId = IdUser1, Name = "Владимир", Code = "0001-2016", Address = "Москва, ул. Двинцев, 8", Discount = 15 });
                
                // Добавление пользователя user2
                RegisterModel modelUser2 = new RegisterModel();
                modelUser2.UserName = "user2";
                modelUser2.Password = "123456";
                modelUser2.ConfirmPassword = "123456";
                WebSecurity.CreateUserAndAccount(modelUser2.UserName, modelUser2.Password);
                roles.AddUsersToRoles(new[] { modelUser2.UserName }, new[] { "Customer" });
                int IdUser2 = WebSecurity.GetUserId(modelUser2.UserName);
                unitOfWork.CustomerRepository().Insert(new Customer() { CustomerId = new Guid("e1fe51b4-2bb2-4852-8a6a-49ddb6c6ed0a"), UserId = IdUser2, Name = "Александр", Code = "0002-2016", Address = "Москва, ул. Летниковская, 7", Discount = 0 });
                
                // Добавление пользователя user3
                RegisterModel modelUser3 = new RegisterModel();
                modelUser3.UserName = "user3";
                modelUser3.Password = "123456";
                modelUser3.ConfirmPassword = "123456";
                WebSecurity.CreateUserAndAccount(modelUser3.UserName, modelUser3.Password);
                roles.AddUsersToRoles(new[] { modelUser3.UserName }, new[] { "Customer" });
                int IdUser3 = WebSecurity.GetUserId(modelUser3.UserName);
                unitOfWork.CustomerRepository().Insert(new Customer() { CustomerId = new Guid("701ac7ce-8c18-43d4-9b95-4377c7997bc4"), UserId = IdUser3, Name = "Василий", Code = "0003-2016", Address = "Москва, ул. Кожевническая, 18", Discount = 10 });

                unitOfWork.OrderRepository().Insert(new Order() { OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), CustomerId = new Guid("74b8c8d2-601b-42f4-9755-4362a6259771"), OrderDate = new DateTime(2016, 8, 3), ShipmentDate = null, OrderNumber = 482791, Status = "Новый"});
                unitOfWork.OrderRepository().Insert(new Order() { OrderId = new Guid("833f3f05-dda0-4b1f-b894-7242c6c69377"), CustomerId = new Guid("74b8c8d2-601b-42f4-9755-4362a6259771"), OrderDate = new DateTime(2015, 5, 13), ShipmentDate = new DateTime(2015, 5, 21), OrderNumber = 736019, Status = "Выполнен"});
                unitOfWork.OrderRepository().Insert(new Order() { OrderId = new Guid("10cca820-bfa3-4926-932d-cb3e923a5bcc"), CustomerId = new Guid("e1fe51b4-2bb2-4852-8a6a-49ddb6c6ed0a"), OrderDate = new DateTime(2016, 8, 26), ShipmentDate = new DateTime(2016, 9, 9), OrderNumber = 778130, Status = "Выполняется"});
                unitOfWork.OrderRepository().Insert(new Order() { OrderId = new Guid("8f2cc9f4-c2f8-4b43-8ceb-5bc1489f6544"), CustomerId = new Guid("e1fe51b4-2bb2-4852-8a6a-49ddb6c6ed0a"), OrderDate = new DateTime(2016, 8, 24), ShipmentDate = new DateTime(2016, 9, 12), OrderNumber = 661031, Status = "Выполняется"});
                unitOfWork.OrderRepository().Insert(new Order() { OrderId = new Guid("7c85d7f5-0743-4e2f-a0d3-b28f3c3f83f8"), CustomerId = new Guid("701ac7ce-8c18-43d4-9b95-4377c7997bc4"), OrderDate = new DateTime(2016, 8, 20), ShipmentDate = new DateTime(2016, 9, 10), OrderNumber = 675107, Status = "Выполняется"});

                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("ce5b2e51-0b44-41d8-9060-c130b7a8308f"), OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), ItemsCount = 1 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("f954a161-7300-4309-be99-0190cfb32ce5"), OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), ItemId = new Guid("9f48e3f1-e711-43c1-bd43-d2c05b171bb9"), ItemsCount = 3 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("ee5eec2e-5376-4189-b3e0-69bf1ca92a81"), OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), ItemId = new Guid("dd100111-1378-45ef-be2e-b664e35bb24f"), ItemsCount = 1 });

                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("a401b440-02eb-4bdb-b1db-8a6a5f8ae319"), OrderId = new Guid("833f3f05-dda0-4b1f-b894-7242c6c69377"), ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), ItemsCount = 5 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("5411d6bf-4456-4df1-983e-5943c07603ee"), OrderId = new Guid("833f3f05-dda0-4b1f-b894-7242c6c69377"), ItemId = new Guid("975521f1-e643-466b-88f8-d8c481bf663b"), ItemsCount = 1 });

                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("3e5e9923-e465-45aa-bbb0-462d48f56372"), OrderId = new Guid("10cca820-bfa3-4926-932d-cb3e923a5bcc"), ItemId = new Guid("dcc7f386-9230-4c7d-a284-f51727a593ef"), ItemsCount = 12 });

                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("d3fafd97-f0e3-4932-b2b9-6e1a737b0e89"), OrderId = new Guid("8f2cc9f4-c2f8-4b43-8ceb-5bc1489f6544"), ItemId = new Guid("dd100111-1378-45ef-be2e-b664e35bb24f"), ItemsCount = 3 });

                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("00655330-dd4b-4ceb-bbda-aaf840647162"), OrderId = new Guid("7c85d7f5-0743-4e2f-a0d3-b28f3c3f83f8"), ItemId = new Guid("00e405a3-3b28-4f59-9aef-ba00cb229d51"), ItemsCount = 1 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("29301d99-c12a-4b00-8f3d-cce5020d2343"), OrderId = new Guid("7c85d7f5-0743-4e2f-a0d3-b28f3c3f83f8"), ItemId = new Guid("975521f1-e643-466b-88f8-d8c481bf663b"), ItemsCount = 2 });

                // Корзина пользователя user2
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("88506a4a-380b-4e6d-adc9-f2b45f6f191b"), OrderId = new Guid("73cf5c49-58f6-4148-8ecb-696e90864295"), ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), ItemsCount = 1 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("48c13fd4-1d8b-4dc4-b19c-fe4c587bc136"), OrderId = new Guid("73cf5c49-58f6-4148-8ecb-696e90864295"), ItemId = new Guid("dcc7f386-9230-4c7d-a284-f51727a593ef"), ItemsCount = 4 });
                unitOfWork.PositionRepository().Insert(new Position() { PositionId = new Guid("aa9dd034-8697-49f9-a94f-549808c6b874"), OrderId = new Guid("73cf5c49-58f6-4148-8ecb-696e90864295"), ItemId = new Guid("cf54cca2-2c07-42fc-89b8-48d32fd4d3aa"), ItemsCount = 2 });
                
                unitOfWork.Save();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        // Если пользователь существует, то возвращается success = true, если пользователь анонимный, то success = false
        [HttpPost]
        [AllowAnonymous]
        public JsonResult GetCurrentUser()
        {
            try
            {
                string currentUser = User.Identity.Name;

                var roles = (SimpleRoleProvider)Roles.Provider;
                var userRoles = roles.GetRolesForUser(currentUser);

                return Json(new { success = true, username = currentUser, roles = userRoles });
            }
            catch
            {
                return Json(new { success = false });
            }
        }

        //
        // POST: /Account/JsonLogin
        [AllowAnonymous]
        [HttpPost]
        public JsonResult JsonLogin(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                if (WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
                {
                    return Json(new { success = true });
                }
                else
                {
                    ModelState.AddModelError("", "Имя пользователя или пароль указаны неверно.");
                }
            }

            return Json(new { success = false, errors = GetErrorsFromModelState() });
        }


        //
        // POST: /Account/LogOff
        [HttpPost]
        [AjaxValidateAntiForgeryToken]
        public JsonResult LogOff()
        {
            try
            {
                WebSecurity.Logout();
                return Json(new { success = true });
            }
            catch
            {
                return Json(new { success = false });
            }
        }

        // POST: /Account/JsonRegister
        [HttpPost]
        [AllowAnonymous]
        [AjaxValidateAntiForgeryToken]
        public ActionResult JsonRegister(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Регистрация пользователя
                try
                {
                    SimpleRoleProvider roles = (SimpleRoleProvider)Roles.Provider;

                    WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
                    roles.AddUsersToRoles(new[] { model.UserName }, new[] { "Customer" });
                    WebSecurity.Login(model.UserName, model.Password);
                    
                    // Добавление пользователя в таблицу заказчиков
                    Customer customer = new Customer();

                    customer.UserId = WebSecurity.GetUserId(model.UserName);
                    customer.CustomerId = Guid.NewGuid();
                    customer.Name = "Александр Анатольевич Лось";
                    customer.Code = "0007-2016";
                    customer.Address = "Ленинская ул., д. 25, корп. 3, кв. 21";
                    customer.Discount = 20;
                    
                    unitOfWork.CustomerRepository().Insert(customer);
                    unitOfWork.Save();

                    InitiateDatabaseForNewUser(model.UserName);

                    FormsAuthentication.SetAuthCookie(model.UserName, createPersistentCookie: false);
                    return Json(new { success = true });
                }
                catch (MembershipCreateUserException e)
                {
                    ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
                }
            }

            return Json(new { success = false, errors = GetErrorsFromModelState() });
        }
        
        /// <summary>
        /// Запуск нового списка рабочих элементов для нового пользователя
        /// </summary>
        /// <param name="userName"></param>
        private static void InitiateDatabaseForNewUser(string userName)
        {

        }

        //
        // POST: /Account/Disassociate
        [HttpPost]
        [AjaxValidateAntiForgeryToken]
        public ActionResult Disassociate(string provider, string providerUserId)
        {
            string ownerAccount = OAuthWebSecurity.GetUserName(provider, providerUserId);
            ManageMessageId? message = null;
            
            // Удалять связь учетной записи, только если текущий пользователь – ее владелец
            if (ownerAccount == User.Identity.Name)
            {
                // Транзакция используется, чтобы помешать пользователю удалить учетные данные последнего входа
                using (var scope = new TransactionScope(TransactionScopeOption.Required, new TransactionOptions { IsolationLevel = IsolationLevel.Serializable }))
                {
                    bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
                    if (hasLocalAccount || OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name).Count > 1)
                    {
                        OAuthWebSecurity.DeleteAccount(provider, providerUserId);
                        scope.Complete();
                        message = ManageMessageId.RemoveLoginSuccess;
                    }
                }
            }

            return RedirectToAction("Manage", new { Message = message });
        }

        //
        // GET: /Account/Manage
        public ActionResult Manage(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Пароль изменен."
                : message == ManageMessageId.SetPasswordSuccess ? "Пароль задан."
                : message == ManageMessageId.RemoveLoginSuccess ? "Внешняя учетная запись удалена."
                : "";
            ViewBag.HasLocalPassword = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.ReturnUrl = Url.Action("Manage");
            return View();
        }

        //
        // POST: /Account/Manage
        [HttpPost]
        [AjaxValidateAntiForgeryToken]
        public ActionResult Manage(LocalPasswordModel model)
        {
            bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            ViewBag.HasLocalPassword = hasLocalAccount;
            ViewBag.ReturnUrl = Url.Action("Manage");
            if (hasLocalAccount)
            {
                if (ModelState.IsValid)
                {
                    // В ряде случаев при сбое ChangePassword породит исключение, а не вернет false.
                    bool changePasswordSucceeded;
                    try
                    {
                        changePasswordSucceeded = WebSecurity.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword);
                    }
                    catch (Exception)
                    {
                        changePasswordSucceeded = false;
                    }

                    if (changePasswordSucceeded)
                    {
                        return RedirectToAction("Manage", new { Message = ManageMessageId.ChangePasswordSuccess });
                    }
                    else
                    {
                        ModelState.AddModelError("", "Неправильный текущий пароль или недопустимый новый пароль.");
                    }
                }
            }
            else
            {
                // У пользователя нет локального пароля, уберите все ошибки проверки, вызванные отсутствующим
                // полем OldPassword
                ModelState state = ModelState["OldPassword"];
                if (state != null)
                {
                    state.Errors.Clear();
                }

                if (ModelState.IsValid)
                {
                    try
                    {
                        WebSecurity.CreateAccount(User.Identity.Name, model.NewPassword);
                        return RedirectToAction("Manage", new { Message = ManageMessageId.SetPasswordSuccess });
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("", e);
                    }
                }
            }

            // Появление этого сообщения означает наличие ошибки; повторное отображение формы
            return View(model);
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [AjaxValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            return new ExternalLoginResult(provider, Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/ExternalLoginCallback

        [AllowAnonymous]
        public ActionResult ExternalLoginCallback(string returnUrl)
        {
            AuthenticationResult result = OAuthWebSecurity.VerifyAuthentication(Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
            if (!result.IsSuccessful)
            {
                return RedirectToAction("ExternalLoginFailure");
            }

            if (OAuthWebSecurity.Login(result.Provider, result.ProviderUserId, createPersistentCookie: false))
            {
                return RedirectToLocal(returnUrl);
            }

            if (User.Identity.IsAuthenticated)
            {
                // Если текущий пользователь вошел в систему, добавляется новая учетная запись
                OAuthWebSecurity.CreateOrUpdateAccount(result.Provider, result.ProviderUserId, User.Identity.Name);
                return RedirectToLocal(returnUrl);
            }
            else
            {
                // Новый пользователь, запрашиваем желаемое имя участника
                string loginData = OAuthWebSecurity.SerializeProviderUserId(result.Provider, result.ProviderUserId);
                ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(result.Provider).DisplayName;
                ViewBag.ReturnUrl = returnUrl;
                return View("ExternalLoginConfirmation", new RegisterExternalLoginModel { UserName = result.UserName, ExternalLoginData = loginData });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [AjaxValidateAntiForgeryToken]
        public ActionResult ExternalLoginConfirmation(RegisterExternalLoginModel model, string returnUrl)
        {
            string provider = null;
            string providerUserId = null;

            if (User.Identity.IsAuthenticated || !OAuthWebSecurity.TryDeserializeProviderUserId(model.ExternalLoginData, out provider, out providerUserId))
            {
                return RedirectToAction("Manage");
            }

            if (ModelState.IsValid)
            {
                // Добавление нового пользователя в базу данных
                using (DatabaseContext db = new DatabaseContext())
                {
                    UserProfile user = db.UserProfiles.FirstOrDefault(u => u.UserName.ToLower() == model.UserName.ToLower());
                    // Проверка наличия пользователя в базе данных
                    if (user == null)
                    {
                        // Добавление имени в таблицу профиля
                        db.UserProfiles.Add(new UserProfile { UserName = model.UserName });
                        db.SaveChanges();

                        InitiateDatabaseForNewUser(model.UserName);

                        OAuthWebSecurity.CreateOrUpdateAccount(provider, providerUserId, model.UserName);
                        OAuthWebSecurity.Login(provider, providerUserId, createPersistentCookie: false);

                        return RedirectToLocal(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError("UserName", "Имя пользователя уже существует. Введите другое имя пользователя.");
                    }
                }
            }

            ViewBag.ProviderDisplayName = OAuthWebSecurity.GetOAuthClientData(provider).DisplayName;
            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [AllowAnonymous]
        [ChildActionOnly]
        public ActionResult ExternalLoginsList(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return PartialView("_ExternalLoginsListPartial", OAuthWebSecurity.RegisteredClientData);
        }

        [ChildActionOnly]
        public ActionResult RemoveExternalLogins()
        {
            ICollection<OAuthAccount> accounts = OAuthWebSecurity.GetAccountsFromUserName(User.Identity.Name);
            List<ExternalLogin> externalLogins = new List<ExternalLogin>();
            foreach (OAuthAccount account in accounts)
            {
                AuthenticationClientData clientData = OAuthWebSecurity.GetOAuthClientData(account.Provider);

                externalLogins.Add(new ExternalLogin
                {
                    Provider = account.Provider,
                    ProviderDisplayName = clientData.DisplayName,
                    ProviderUserId = account.ProviderUserId,
                });
            }

            ViewBag.ShowRemoveButton = externalLogins.Count > 1 || OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
            return PartialView("_RemoveExternalLoginsPartial", externalLogins);
        }

        #region Вспомогательные методы
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }
            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                OAuthWebSecurity.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        private IEnumerable<string> GetErrorsFromModelState()
        {
            return ModelState.SelectMany(x => x.Value.Errors.Select(error => error.ErrorMessage));
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // По адресу http://go.microsoft.com/fwlink/?LinkID=177550 можно просмотреть
            // полный список кодов состояний.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "Имя пользователя уже существует. Введите другое имя пользователя.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "Имя пользователя для данного адреса электронной почты уже существует. Введите другой адрес электронной почты.";

                case MembershipCreateStatus.InvalidPassword:
                    return "Указан недопустимый пароль. Введите допустимое значение пароля.";

                case MembershipCreateStatus.InvalidEmail:
                    return "Указан недопустимый адрес электронной почты. Проверьте значение и повторите попытку.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "Указан недопустимый ответ на вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "Указан недопустимый вопрос для восстановления пароля. Проверьте значение и повторите попытку.";

                case MembershipCreateStatus.InvalidUserName:
                    return "Указано недопустимое имя пользователя. Проверьте значение и повторите попытку.";

                case MembershipCreateStatus.ProviderError:
                    return "Поставщик проверки подлинности вернул ошибку. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

                case MembershipCreateStatus.UserRejected:
                    return "Запрос создания пользователя был отменен. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";

                default:
                    return "Произошла неизвестная ошибка. Проверьте введенное значение и повторите попытку. Если проблему устранить не удастся, обратитесь к системному администратору.";
            }
        }
        #endregion
    }
}
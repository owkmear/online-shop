using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using OnlineShop.Models;
using PagedList.Mvc;
using PagedList;
using System.Data;
using System.Web.Helpers;
using OnlineShop.Filters;

namespace OnlineShop.Controllers
{

    // TODO: Контроллер для вспомогательных действий, переименовать
    public class ItemTableController : Controller
    {
        // Смена токенов для защиты от CSRF-атак
        public JsonResult ChangeCsrfTokens()
        {
            try
            {
                string cookieToken, formToken;
                AntiForgery.GetTokens(null, out cookieToken, out formToken);
                var user = new HttpCookie("__RequestVerificationToken")
                {
                    Value = cookieToken
                };
                Response.SetCookie(user);

                return Json(new { success = true, formToken = formToken }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        [AjaxValidateAntiForgeryToken]
        public JsonResult CSRFMethod()
        {
            try
            {
                return Json(new { success = true, data = "CSRF method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "CSRF method failure" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetHttpCookie()
        {
            string cookieToken, formToken;
            AntiForgery.GetTokens(null, out cookieToken, out formToken);
            var user = new HttpCookie("__RequestVerificationToken")
            {
                Value = cookieToken
            };
            Response.SetCookie(user);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAntiForgeryToken()
        {
            string cookieToken, formToken;
            AntiForgery.GetTokens(null, out cookieToken, out formToken);

            
            var user = new HttpCookie("__RequestVerificationToken")
                {
                    Value = cookieToken
                };
            Response.SetCookie(user);

            return Json(new { success = true, cookieToken = cookieToken, formToken = formToken }, JsonRequestBehavior.AllowGet);
        }

        [ValidateAntiForgeryToken]
        public JsonResult CSRFManagerMethodHttp()
        {
            try
            {
                return Json(new { success = true, data = "Manager Method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "Manager Method failure" }, JsonRequestBehavior.AllowGet);
            }
        }

        [ValidateAntiForgeryToken]
        [OnlineShopAuthorize(Roles = "Manager")]
        public JsonResult CSRFManagerMethod()
        {
            try
            {
                return Json(new { success = true, data = "Manager Method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "Manager Method failure" }, JsonRequestBehavior.AllowGet);
            }
        }

        //[HttpPost]
        [OnlineShopAuthorize(Roles = "Manager")]
        public JsonResult ManagerMethod()
        {
            try
            {
                return Json(new { success = true, data = "Manager Method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "Manager Method failure" }, JsonRequestBehavior.AllowGet);
            }
        }
        [AllowAnonymous]
        public JsonResult AnonymouseMethod()
        {
            try
            {
                return Json(new { success = true, data = "Anonymous Method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "Anonymous Method failure" }, JsonRequestBehavior.AllowGet);
            }
        }

        [OnlineShopAuthorize(Roles = "Customer")]
        public JsonResult CustomerMethod()
        {
            try
            {
                return Json(new { success = true, data = "Customer Method success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { success = false, data = "Customer Method failure" }, JsonRequestBehavior.AllowGet);
            }
        }

        private DatabaseContext db = new DatabaseContext();

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

    }
}

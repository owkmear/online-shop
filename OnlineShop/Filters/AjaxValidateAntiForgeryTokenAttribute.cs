using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace OnlineShop.Filters
{

    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class AjaxValidateAntiForgeryTokenAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            try
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    this.ValidateRequestHeader(filterContext.HttpContext.Request);
                }
                else
                {
                    AntiForgery.Validate();
                }
            }
            catch (HttpAntiForgeryException e)
            {
                throw new HttpAntiForgeryException("Anti forgery token not found: " + e.Message);
            }
        }
 
        private void ValidateRequestHeader(HttpRequestBase request)
        {
            string formToken = request.Headers["__RequestVerificationToken"]; // read the header key and validate the tokens.
            
            var s = request.Cookies["__RequestVerificationToken"];
            
            string cookieToken = s.Value;

            AntiForgery.Validate(cookieToken, formToken); // this validates the request token.
        }
    }
}
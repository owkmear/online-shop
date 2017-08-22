using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
//using OnlineShop.Controllers;
using OnlineShop.Controllers;
using System.Web.Mvc;
using System.Diagnostics;


namespace OnlineShop.Tests.Controllers
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void IndexViewResultNotNull()
        {
            PositionsController controller = new PositionsController();
            JsonResult result = controller.GetPositionsByOrderId(new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d")) as JsonResult;
            Debug.WriteLine(result.Data);
            Assert.IsNotNull(result);
        }
    }
}

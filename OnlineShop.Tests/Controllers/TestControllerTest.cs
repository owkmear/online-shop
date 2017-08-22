using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OnlineShop.Controllers;
using System.Web.Mvc;
using System.Diagnostics;
using OnlineShop.DAL;
using Moq;
using OnlineShop.Models;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Linq;
using System.Web.Script.Serialization;


namespace OnlineShop.Tests.Controllers
{
    [TestClass]
    public class TestControllerTest
    {
        List<Item> items = new List<Item> {
            new Item() { ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), Code = "07-2016-AA14", Name = "Бананы", Price = 7350, Category = "Фрукты" },
            new Item() { ItemId = new Guid("cf54cca2-2c07-42fc-89b8-48d32fd4d3aa"), Code = "07-2016-AB14", Name = "Томаты", Price = 8900, Category = "Фрукты" }
        };

        [TestMethod]
        public void MyTest2()
        {
            // Arrange
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(a => a.ItemRepository().Get(
                It.IsAny<Expression<Func<Item, bool>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<string>()
            )).Returns(items);
            TestController controller = new TestController(mock.Object);
            
            // Act
            JsonResult result = controller.Index() as JsonResult;
 
            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        // Проверка того, что метод возвращает данные
        public void MyTest3()
        {
            // Arrange
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(a => a.ItemRepository().Get(
                It.IsAny<Expression<Func<Item, bool>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<string>()
            )).Returns(items);
            TestController controller = new TestController(mock.Object);
            string expected = "2";
            
            // Act
            JsonResult result = controller.Index() as JsonResult;

            var resultString = result.Data.ToString();
            Debug.WriteLine("Тип: " + resultString);

            // Assert
            Assert.IsNotNull(result);
        }
        public class Sort
        {
            int success { get; set; }
        }

        [TestMethod]
        // Проверка количества записей в таблице
        public void MyTest4()
        {
            // Arrange
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(a => a.ItemRepository().Get(
                It.IsAny<Expression<Func<Item, bool>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<Func<IQueryable<Item>, IOrderedQueryable<Item>>>(),
                It.IsAny<string>()
            )).Returns(items);
            TestController controller = new TestController(mock.Object);
            string expected = "{ success = " + items.Count() + " }";
            
            // Act
            JsonResult jsonResult = controller.Index() as JsonResult;
            
            // Assert
            string result = jsonResult.Data.ToString();
            Assert.AreEqual(expected, result);
        }
    }
}

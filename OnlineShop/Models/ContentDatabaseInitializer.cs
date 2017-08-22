using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class ContentDatabaseInitializer : DropCreateDatabaseAlways<DatabaseContext>
    {
        protected override void Seed(DatabaseContext context)
        {
            context.Items.Add(new Item() { ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), Code = "07-2016-AA14", Name = "Бананы", Price = 7350, Category = "Фрукты" });
            context.Items.Add(new Item() { ItemId = new Guid("64eb7fe1-2554-49d4-be4c-888a03c33a94"), Code = "07-2016-AB14", Name = "Томаты", Price = 8900, Category = "Фрукты" });
            context.Items.Add(new Item() { ItemId = new Guid("6007cc09-3a70-4300-b2c5-9864c2b76c55"), Code = "07-2016-AC14", Name = "Персики", Price = 11590, Category = "Фрукты" });

            context.Orders.Add(new Order() { OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), CustomerId = new Guid("cfb5eb8f-f3bc-420f-9013-dabaab7a96dd"), OrderDate = new DateTime(2016, 8, 20), ShipmentDate = new DateTime(2016, 8, 27), OrderNumber = 482791, Status = "Новый"});
            
            context.Customers.Add(new Customer() { CustomerId = new Guid("74b8c8d2-601b-42f4-9755-4362a6259771"), UserId = 1, Name = "Владимир", Code = "0001-2016", Address = "Москва, ул. Двинцев, 8", Discount = 5 });
            
            context.Positions.Add(new Position() { PositionId = new Guid("ce5b2e51-0b44-41d8-9060-c130b7a8308f"), OrderId = new Guid("6cd1ec27-54b8-4393-9f8c-fb8a3447205d"), ItemId = new Guid("64b53092-00ae-44ec-bd48-08684bff00c5"), ItemsCount = 1 });
            
            


            base.Seed(context);
        }
    }
}
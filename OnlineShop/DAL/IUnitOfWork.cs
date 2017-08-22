using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineShop.Models;

namespace OnlineShop.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        GenericRepository<Position> PositionRepository();
        GenericRepository<Order> OrderRepository();
        GenericRepository<Item> ItemRepository();
        GenericRepository<Customer> CustomerRepository();
        void Save();
    }
}
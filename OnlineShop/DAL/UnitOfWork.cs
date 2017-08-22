using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineShop.Models;

namespace OnlineShop.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private DatabaseContext context = new DatabaseContext();
        private GenericRepository<Item> itemRepository;
        private GenericRepository<Customer> customerRepository;
        private GenericRepository<Order> orderRepository;
        private GenericRepository<Position> positionRepository;

        public GenericRepository<Item> ItemRepository()
        {
            if (this.itemRepository == null)
            {
                this.itemRepository = new GenericRepository<Item>(context);
            }
            return itemRepository;
        }

        public GenericRepository<Position> PositionRepository()
        {
            if (this.positionRepository == null)
            {
                this.positionRepository = new GenericRepository<Position>(context);
            }
            return positionRepository;
        }

        public GenericRepository<Order> OrderRepository()
        {
            if (this.orderRepository == null)
            {
                this.orderRepository = new GenericRepository<Order>(context);
            }
            return orderRepository;
        }

        public GenericRepository<Customer> CustomerRepository()
        {
            if (this.customerRepository == null)
            {
                this.customerRepository = new GenericRepository<Customer>(context);
            }
            return customerRepository;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}

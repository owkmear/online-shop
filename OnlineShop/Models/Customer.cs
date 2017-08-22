using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class Customer // Заказчик
    {
        [Key]
        [Required]
        public Guid CustomerId { get; set; } // ID заказчика

        public int UserId { get; set; } // ID пользователя

        [Required]
        public string Name { get; set; } // Наименование заказчика

        [Required]
        public string Code { get; set; } // Код заказчика

        public string Address { get; set; } // Адрес заказчика

        public int Discount { get; set; } // Скидка заказчика

        
        
        // Связи
        public List<Order> Orders { get; set; }
    }
}
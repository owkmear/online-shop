using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class Order // Заказ
    {
        [Key]
        [Required]
        public Guid OrderId { get; set; } // ID

        [Required]
        public Guid CustomerId { get; set; } // ID заказчика

        [Required]
        public DateTime OrderDate { get; set; } // Дата совершения заказа

        public DateTime? ShipmentDate { get; set; } // Дата доставки

        public int OrderNumber { get; set; } // Номер заказа

        public string Status { get; set; } // Состояние заказа
    }
}
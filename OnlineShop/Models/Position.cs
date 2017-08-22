using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class Position // Элемент заказа
    {
        [Key]
        [Required]
        public Guid PositionId { get; set; } // ID

        [Required]
        public Guid OrderId { get; set; } // ID заказа

        [Required]
        public Guid ItemId { get; set; } // ID товара

        [Required]
        public int ItemsCount { get; set; } // Количество заказанного товара

    }
}
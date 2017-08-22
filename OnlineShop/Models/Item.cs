using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class Item // Товар
    {
        [Key]
        [Required]
        public Guid ItemId { get; set; } // ID

        [Required]
        public string Code { get; set; } // Код товара

        public string Name { get; set; } // Наименование товара

        public int Price { get; set; } // Цена за единицу товара

        [MaxLength(30)]
        public string Category { get; set; } // Категория товара


        // Связи
        public List<Position> Positions { get; set; }
    }
}
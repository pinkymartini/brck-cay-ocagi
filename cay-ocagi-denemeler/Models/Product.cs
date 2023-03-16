using System.ComponentModel.DataAnnotations;

namespace cay_ocagi_denemeler.Models
{
    public class Product
    {
        public Product() { }

        public Guid ProductId { get; set; }

        public string Name { get; set; }

        public string? Type { get; set; } //şekerli,şekersiz, desc. 

        public int Quantity { get; set; } 

        public Guid OrderId { get; set; }

    }
}

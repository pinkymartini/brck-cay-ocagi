using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace cay_ocagi_denemeler.Models
{
    public class Order
    {
        public Order() { }
        
        
        public Guid OrderId { get; set; }
        
        public virtual Location? Location { get; set; }
        public virtual ICollection<Product> Products {get; set; } = new List<Product>();

        public virtual User? OrderedBy { get; set; }
    }
}

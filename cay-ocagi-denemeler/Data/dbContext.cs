using cay_ocagi_denemeler.Models;
using Microsoft.EntityFrameworkCore;


namespace cay_ocagi_denemeler.Data
{
    public class dbContext : DbContext
    {
        public dbContext(DbContextOptions options) : base (options){ }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            

        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Order>  Orders { get; set; }
        public DbSet<Product> Products { get; set; }

    }
}

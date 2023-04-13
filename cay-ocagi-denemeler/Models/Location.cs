using System.ComponentModel.DataAnnotations;

namespace cay_ocagi_denemeler.Models
{
    public class Location
    {
        public Location() { }
      
        public Guid LocationID { get; set; } 
        public string Department { get; set; }
        public string? MeetingRoom { get; set; } 
    }
}

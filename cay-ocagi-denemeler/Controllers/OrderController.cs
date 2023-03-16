using cay_ocagi_denemeler.Data;
using cay_ocagi_denemeler.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace cay_ocagi_denemeler.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        private readonly dbContext context;

        public OrderController(dbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task <IActionResult> GetOrders()
        {
           var orders = await context.Orders.ToListAsync();

            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> PostOrder ([FromBody] Order order)
        {
            await context.Orders.AddAsync(order);
            await context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] Guid id)
        {

           var order =  await context.Orders.FindAsync(id);
            if(order== null)
            {
                return BadRequest();
            }
            else
            {
                context.Orders.Remove(order);

                await context.SaveChangesAsync();

                return Ok(order);

            }
            

            
        }

        [HttpPut]
        [Route("{id:Guid}/addProduct")]
        [AllowAnonymous]
        //add entry to a list
        public async Task<IActionResult> AddProductToOrder([FromRoute] Guid id, Product product)
        {
            var order = await context.Orders.FindAsync(id);
            if (order != null)
            {
                order.Products.Add(product);
                await context.SaveChangesAsync();
                return Ok(order);
            }
            else
            {
                //throw new Exception();
                return NotFound();
            }
        }


        [HttpGet]
        [Route("/GetOrderByDepartment")]
        public async Task<IActionResult> GetOrderByDepartment([FromQuery] string Department)
        {
            var orders = await context.Orders.Where(x=>x.Location.Department==Department).ToListAsync();

            return Ok(orders);
        }
    }


}

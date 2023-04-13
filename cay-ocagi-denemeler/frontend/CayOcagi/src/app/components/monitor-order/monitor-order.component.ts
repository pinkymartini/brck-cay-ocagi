import { AfterViewChecked, AfterViewInit, Component, ChangeDetectorRef ,ElementRef, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/models/order';
import { timer } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-monitor-order',
  templateUrl: './monitor-order.component.html',
  styleUrls: ['./monitor-order.component.css']
})
export class MonitorOrderComponent implements OnInit {

  
constructor(private orderService: OrderService){}
 

departmentSelection:string='ARGE'


orderList : Order[] = [];

previousOrderList:Order[]=[];

  ngOnInit(): void {
  
    this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
      next:(orders)=>{
        this.orderList=orders;
      this.previousOrderList=this.orderList;
        
      }
    })
  
    timer(3000, 3000).subscribe(() => {

      console.log(this.departmentSelection)
      
      this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
        next:(orders)=>{
          this.orderList=orders;
          
          if(!this.arraysEqual(this.previousOrderList, this.orderList)) {
            let prevIds = this.previousOrderList.map(order => order.orderId);
            let orderIDs = this.orderList.map(order => order.orderId);
          
            if(prevIds.every(r => orderIDs.includes(r))) {
              this.scroll('target');
            }
            this.previousOrderList = this.orderList;
          }
        }
      })
    });
  }

  deleteOrder(id: string)
  {
    this.orderService.deleteOrder(id).subscribe({
      next:()=>{
        this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
          next:(orders)=>{
            this.orderList=orders;
          }
        })
      }
    })
  }

  arraysEqual(a1:Order[],a2:Order[])
  {
    return JSON.stringify(a1)==JSON.stringify(a2);

  }

  getOrderByDepartment(departmentSelection:string )
  {
    if(departmentSelection=='ALL')
    {
      this.getOrders()
    }
    else
    {
      
    this.orderService.getOrderByDepartment(departmentSelection).
    subscribe({
      next: (orders)=>{
        this.orderList=orders;
        
       
      }
    })
    }

    // this.orderService.getOrderByDepartment(departmentSelection).
    // subscribe({
    //   next: (orders)=>{
    //     this.orderList=orders;
        
       
    //   }
    // })
  }

  getOrders(){

    this.orderService.getOrders().
    subscribe({
      next: (orders)=>{
        this.orderList=orders;
      }
    })

  }

  scroll(id:string) {
    setTimeout(() => {
      const targetDiv = document.getElementById(id);
      const rect = targetDiv.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset,
        behavior: 'smooth'
      });
    }, 0);
}


checkDuration()
{
  let today =  Date.now()
  let date = formatDate(today, ' HH:mm', 'en-US');
  //console.log(date)

  let orderDate = formatDate(this.orderList.at(0).orderDate,' HH:mm', 'en-US' )

  //console.log(this.orderList.)


    
}

  


}

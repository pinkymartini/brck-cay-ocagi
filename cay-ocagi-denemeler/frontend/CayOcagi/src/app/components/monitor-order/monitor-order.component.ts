import { AfterViewChecked, AfterViewInit, Component, ChangeDetectorRef, ElementRef, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/models/order';
import { first, min, timer } from 'rxjs';
import { formatDate } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatCardSubtitle } from '@angular/material/card';


@Component({
  selector: 'app-monitor-order',
  templateUrl: './monitor-order.component.html',
  styleUrls: ['./monitor-order.component.css']
})
export class MonitorOrderComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  @ViewChild('myid') myid:MatCardSubtitle; 

  constructor(private orderService: OrderService) { }

  date: Date= new Date(); 
  departmentSelection: string = 'ARGE'

  progressSpinnerValue: number = 0;

  orderList: Order[] = [];

  previousOrderList: Order[] = [];

  ngOnInit(): void {




    this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
      next: (orders) => {
        this.orderList = orders;
        this.previousOrderList = this.orderList;
      }
    })

    timer(60000, 60000).subscribe(() => {

      this.date=new Date();
      
    })

    timer(3000, 3000).subscribe(() => {

      this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
        next: (orders) => {
          this.orderList = orders;
         

          if (!this.arraysEqual(this.previousOrderList, this.orderList) && this.orderList.length!=0 ) {
            let prevIDs = this.previousOrderList.map(order => order.orderId);
            let orderIDs = this.orderList.map(order => order.orderId);

            if (prevIDs.every(r => orderIDs.includes(r))) {
              this.scroll('target');
            }
            this.previousOrderList = this.orderList;
          }
        }
      })
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.orderService.getOrderByDepartment(this.departmentSelection).subscribe({
          next: (orders) => {
            this.orderList = orders;
          }
        })
      }
    })
  }

  arraysEqual(a1: Order[], a2: Order[]) {
    return JSON.stringify(a1) == JSON.stringify(a2);

  }



  scroll(id: string) {
    setTimeout(() => {
      const targetDiv = document.getElementById(id);
      const rect = targetDiv.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset,
        behavior: 'smooth'
      });
    }, 0);
  }




  foo(date1: Date, date2: Date) {

    // var firstDate = this.convert(date1)
    // var secondDate = this.convert(date2)

    var res= Math.floor((new Date(date1).getTime() - new Date(date2).getTime())) / 60000
    this.progressSpinnerValue=Math.abs(Math.trunc(res))


    this.changeSpinnerColor(this.progressSpinnerValue)

    return this.progressSpinnerValue
  }


  changeSpinnerColor(diff: number)
  {
    if(diff>=0 && diff<=20)
    {
      this.color='primary'
    }
    else if (diff>20 && diff<=40)
    {
      this.color='accent'
    }
    else this.color='warn'
  }




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,) { }



  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>('https://localhost:7265/Order');
  }

  createOrder(order:Order): Observable<Order>{
    order.orderId='00000000-0000-0000-0000-000000000000';
    return this.http.post<Order>('https://localhost:7265/Order', order)
  }

  deleteOrder(id: string): Observable<Order>{
    return this.http.delete<Order>('https://localhost:7265/Order/'+id)
  }

  getOrderByDepartment(department:string):Observable<Order[]>{
    if(department=='ALL')
    {
      return this.getOrders()
    }
    else return this.http.get<Order[]>('https://localhost:7265/GetOrderByDepartment?Department='+department);
  }


}

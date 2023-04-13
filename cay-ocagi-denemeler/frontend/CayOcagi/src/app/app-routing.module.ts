import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { MonitorOrderComponent } from './components/monitor-order/monitor-order.component';

const routes: Routes = [
  {
   path: '',
   component: CreateOrderComponent
  },
  {
    path: 'monitor-order',
    component: MonitorOrderComponent
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateOrderComponent, DialogComponent } from './components/create-order/create-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule, } from '@angular/material/select';
import {MatInputModule, } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MonitorOrderComponent } from './components/monitor-order/monitor-order.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';

import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { TitleCaseTurkishPipe } from './pipes/titlecase-turkish.pipe';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    CreateOrderComponent,
    MonitorOrderComponent,
    DialogComponent,
    TitleCaseTurkishPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

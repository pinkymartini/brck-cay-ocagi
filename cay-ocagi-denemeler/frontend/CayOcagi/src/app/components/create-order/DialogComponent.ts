import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/models/product';

//these components may be moved to another file ??

@Component({
  selector: 'app-dialog-component',
  template: `
    <h2 mat-dialog-title>Sepetim</h2>
    <div mat-dialog-content >

    <div *ngIf="data.cart && data.cart.length;  else emptyCart">
  
    <!-- this works. but need cleanup? -->
    

      <div *ngFor="let item of data.cart" >

      <div *ngIf="item.type!='other' else noteBlock">

     

      <div style="display: flex; flex-direction: row; gap:100px " >

      <p> {{item.quantity}} Adet {{item.type | titlecaseTurkish}} {{item.name}} </p> 
      
      
      <div style = "display: flex; flex-direction: row;  flex:1 ;  justify-content: flex-end;">
      <button mat-mini-fab color="primary" (click)="addToCart(item)" >
      <mat-icon>add</mat-icon>


      </button>
      <button mat-mini-fab color="warn" (click)="removeFromCart(item)">
      <mat-icon>remove</mat-icon>
      </button>
      </div>
      
      </div>
      
      </div>

      <ng-template #noteBlock>

      <div style="display: flex; flex-direction: row; gap:100px;  flex: 1 " >
          <p>
           {{item.name}}
          </p>
          <div style="display: flex; justify-content: flex-end; flex:1">
          <button mat-mini-fab (click)="removeFromCart(item)">
          <mat-icon>close</mat-icon>
          
          </button>
          </div>
      </div>


      </ng-template>

      </div>
    </div>

        <ng-template #emptyCart>
          <p>
            <mat-icon>warning</mat-icon>
            Sepetinizde Ürün Bulunmamaktadır.
            </p>
          </ng-template>

        


    <div mat-dialog-actions>
      <div style= "display: flex; flex-direction:row">
      <button mat-button color="primary" (click)="closeDialog()">Kapat</button>
      <button mat-button color="warn" (click)="EmptyCart()">Sepeti Boşalt</button>
      </div>
    </div>
    </div>
  `

  // templateUrl: './DialogComponent.html',
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog() {
    this.dialogRef.close();
  }

  onAdd = new EventEmitter();

  onAdd2 = new EventEmitter();

  onAdd3 = new EventEmitter();

  EmptyCart() {
    this.onAdd.emit();
    this.data.cart = [];
  }

  addToCart(product: Product) {

    this.onAdd2.emit();
    this.data.addToCart(product);

  }

  removeFromCart(product: Product) {
    console.log(this.data.cart)
    this.onAdd3.emit();
    this.data.removeFromCart(product);
  }

 



}

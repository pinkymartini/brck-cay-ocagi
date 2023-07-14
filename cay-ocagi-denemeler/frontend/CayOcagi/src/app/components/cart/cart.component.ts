import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public dialogRef: MatDialogRef<CartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  showNoteForm: boolean = false
  icon: string = 'add'
  cartToolTip: string = "Not Ekle"
  isEditMode: boolean = false;
  prevProductValue: string = ""

  otherProduct: Product = {
    productId: '00000000-0000-0000-0000-000000000000',
    name: '',
    quantity: 1,
    type: 'other'
  }

  // clearOtherProduct() {
  //   this.otherProduct.name = ''
  //   this.otherProduct.productId = '00000000-0000-0000-0000-000000000000'
  // }

  closeDialog() {
    this.dialogRef.close();
  }

  onAdd = new EventEmitter();

  onAdd2 = new EventEmitter();

  onAdd3 = new EventEmitter();

  onAdd4 = new EventEmitter();

  EmptyCart() {
    this.onAdd.emit();
    this.data.cart = [];
    this.data.isCartEmpty = true
    console.log(this.data.cart)
  }

  addToCart(product: Product) {

    this.onAdd2.emit();
    this.data.addToCart(product);
    // this.clearOtherProduct();
    console.log(this.data.cart)
  }

  removeFromCart(product: Product) {
    this.onAdd3.emit();
    console.log(this.data.cart)
    this.data.removeFromCart(product);

    if(this.isEditMode)
    {
      this.isEditMode=false
    }
    
  }

  addNote(product: Product) {

    console.log(this.isEditMode)

    console.log("product is ", product)

    if (this.isEditMode == false) {
      this.onAdd4.emit();
      this.data.addToCart(product);
    }
    else {
      this.onAdd4.emit();
      var item = this.data.cart.find(e => e.name == this.prevProductValue)
      if (item) {
        item.name = product.name
        this.isEditMode = false
        this.data.otherProduct.name = ""
      }
      else{
        this.isEditMode = false
        this.data.otherProduct.name = ""
        return
      }

      // console.log("item is ", item)
      // console.log(this.data.cart)
      //item.name=this.otherProduct.name
     
    }
    this.showNoteFormFunc();

    //this.data.clearOtherProduct();
  }

  showNoteFormFunc(): void {
    this.showNoteForm = !this.showNoteForm
    
    this.changeIcons()

    // this.icon='add'
  }

  changeIcons(){
    if (this.showNoteForm) {
      this.icon = "close"
      this.cartToolTip = "İptal et"
      console.log("editledik")
      console.log(this.data.cart)

    }
    else {
      console.log("onayladık")
      this.icon = "add"
      this.cartToolTip = "Not Ekle"
      this.data.otherProduct.name = ""
    }
  }

  // editNote(product: Product){
  //   this.data.cart.find(r=>r.name==product.name).name =

  // }

  fillform(product: Product) {
    this.isEditMode = true
    this.showNoteForm =true
    this.prevProductValue = product.name
    this.data.otherProduct.name = product.name
    this.changeIcons()
  }


}

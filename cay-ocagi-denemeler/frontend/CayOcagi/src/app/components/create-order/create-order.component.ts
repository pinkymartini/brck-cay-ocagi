import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Drinks } from 'src/models/drinks';
import { Order } from 'src/models/order';
import { Product } from 'src/models/product';
import { User } from 'src/models/user';

import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;


  toggle(str: string, num: number) {
    this._drinks[num].selectedOption = str
  }

  locations = new Map<string, string[]>([
    ['ARGE', ["ÇALIŞMA ODASI 1", "ÇALIŞMA ODASI 2", "ÇALIŞMA ODASI 3", "ARGE TEST MERKEZİ TO", "ARGE TOPLANTI ODASI"]],
    ['İNSAN KAYNAKLARI', ["MOR", "MAVİ", "YEŞİL", "GÖRÜŞME ODASI"]],
    ['GENEL MÜDÜRLÜK ALT KAT', ["KUMLA", "ARMUTLU", "ULUDAĞ", "SOSYAL ALAN", "ÇALIŞMA ODASI 1", "ÇALIŞMA ODASI 2", "MUHASEBE TO"]],
    ['GENEL MÜDÜRLÜK ÜST KAT', ["NARLI", "MUDANYA", "SATIŞ TO",]],
    ['BTA', ["BTA TOPLANTI ODASI"]]
  ]);

  _drinks: Drinks[] = [
    {
      name: 'Türk Kahvesi',
      options: ['Sade', 'Orta', 'Şekerli'],
      selectedOption: 'SADE',
      quantityMap: new Map([
        ['SADE', 0],
        ['ORTA', 0],
        ['ŞEKERLİ', 0]
      ])
    },

    {
      name: 'Çay',
      options: ['Normal', 'Açık'],
      selectedOption: 'NORMAL',
      quantityMap: new Map([
        ['AÇIK', 0],
        ['NORMAL', 0],
      ])
    },

    {
      name: 'Ihlamur',
      quantity: 0,

    },
    {
      name: 'Filtre Kahve',
      quantity: 0
    }
  ]
  //drinks modeline gerek yok esasen.

  isTextFieldOpen: boolean = false;



  otherProduct: Product = {
    productId: '00000000-0000-0000-0000-000000000000',
    name: '',
    quantity: 1,
    type: 'other'
  }

  isCartEmpty: boolean = true;
  totalItems: number = 0;


  showTextField() {
    if (this.isTextFieldOpen) {
      this.isTextFieldOpen = !this.isTextFieldOpen
    }

  }




  find(name: string) {
    var c = this._drinks?.find(e => e.name == name)
    console.log(c);
    console.log(c?.name)
    return c?.selectedOption;
  }



  get_total() {
    let res = 0;
  
    for (let item of this.cart) {
      if (item.type !== 'other') { 
        if (item.quantity === 0) {
          res += 1;
        } else {
          res += item.quantity;
        }
      }
    }
  
    return this.totalItems = res;
  }
  



  func(drinkOfChoice: string, op: string, selectedOption?: string) {

    console.log('called')

    var drink = this._drinks?.find(x => x.name == drinkOfChoice)



    if (drink?.name == 'Ihlamur' || drink?.name == 'Filtre Kahve') {
      //console.log(drink.name)
      var qty = drink?.quantity
      console.log('called2')
    }
    else {
      var qty = drink?.quantityMap.get(selectedOption)
    }




    qty += 1;
    var product = <Product>{

      quantity: qty,
      name: drink?.name,
      type: selectedOption,
      productId: '00000000-0000-0000-0000-000000000000'
    }
    if (op == '+') {

      this.addToCart(product)
      this.isCartEmpty = false;

    }
    else if (op == '-') {
      this.removeFromCart(product)
      if (this.cart.length == 0) {
        this.isCartEmpty = true;


      }

    }

  }

  errorMessage: string = ''


  departmentOrder: boolean = false;

  departmentSelection: string = ''

  fullName: string = '';

  orderList: Order[] = [];

  newOrderDetails: Order = {
    orderId: '',
    location: {
      department: 'Masa',
      locationId: '00000000-0000-0000-0000-000000000000',
      meetingRoom: ''
    },
    products: [], // populate this,
    orderedBy: {
      name: '',
      userId: 0,
      surname: ''
    },
    orderDate: new Date()
  }; //for new order creation, to display we need another orderdetails object. (maybe another component)



  userDetails: User = {
    userId: 0,
    name: '',
    surname: ''
  }

  cart: Product[] = [];



  constructor(private orderService: OrderService, private _formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }






  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 4000 });
  }

  reset() {
    //this.stepper.reset()
  }

  ngOnInit(): void {
    this.orderService.getOrders().
      subscribe({
        next: (orders) => {
          this.orderList = orders;
        }
      })

    // this.firstFormGroup.controls.departmentOrderCtrl.valueChanges.subscribe(value => {
    //   this.departmentOrder = value;
    // });
  }



  removeFromCart(product: Product) {
    const index = this.cart.findIndex(e => e.name === product.name && e.type === product.type);

    if (index !== -1) {
      if (this.cart[index].quantity === 1) {
        this.cart.splice(index, 1);

      } else {
        this.cart[index].quantity--;
      }
    }
    // if(this.cart.length==0){
    //   this.cart=[]
    //   console.log("else")
    //   this.isCartEmpty=true
    // }

    this.cart.sort((a, b) => {
      // Sort items with type "other" to appear last
      if (a.type === "other" && b.type !== "other") {
        return 1;
      }
      if (a.type !== "other" && b.type === "other") {
        return -1;
      }

      // Sort items alphabetically within the same type
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    // this.isCartEmpty = true;

    // console.log(this.isCartEmpty)


  }

  addToCart(product: Product) {

    //eğer duplicate varsa quantitysini artır.
    if (this.cart.some(e => e.name == product.name && e.type == product.type)) {
      var filteredProduct = this.cart.find(e => e.name == product.name && e.type == product.type)
      filteredProduct.quantity += 1;
      console.log("create order list iff: ", this.cart)
    }

    else {

      //eğer duplicate yoksa
      const newProduct = { ...product };
      this.cart.push(newProduct)
      //console.log(this.cart)


      console.log("create order list: ", this.cart)

    }

    // this.cart.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    // Sort the cart based on the type property
    this.cart.sort((a, b) => {
      // Sort items with type "other" to appear last
      if (a.type === "other" && b.type !== "other") {
        return 1;
      }
      if (a.type !== "other" && b.type === "other") {
        return -1;
      }

      // Sort items alphabetically within the same type
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });



    this.isCartEmpty = false;

    this.clearOtherProduct();

  }


  log() {
    console.log(this.cart)
  }


  splitNameAndSurname(value: string) {
    const [name, ...surname] = value.split(' ').filter(Boolean);
    this.userDetails.name = name;
    this.userDetails.surname = surname.join(' ');

    this.newOrderDetails.orderedBy = this.userDetails;
  }

  orderToWorkingStation() {
    this.newOrderDetails.location.department = 'Masa'
  }




  createNewOrder(orderDetails: Order) {

    orderDetails.products = this.cart

    console.log(orderDetails)



    this.orderService.createOrder(orderDetails).subscribe({
      next: (res) => {

        this.orderService.getOrders().subscribe({
          next: (orders) => {
            this.orderList = orders;
            this.clearOrder();
            this.cart = [];
            this.isCartEmpty = true
            if (orders) {
              this.openSnackBar('Siparişiniz Alınmıştır ✓', 'Kapat');
            }

            this.stepper.reset()
          }
        })
      },
      error: (err) => {
        this.openSnackBar('Bağlantı Hatası!', 'Kapat')
      }
    })

  }

  clearOrder() {
    this.newOrderDetails.location.department = '';
    this.newOrderDetails.location.locationId = '00000000-0000-0000-0000-000000000000';
    this.newOrderDetails.location.meetingRoom = '';
    this.newOrderDetails.orderId = '';
    this.newOrderDetails.orderedBy.name = '';
    this.newOrderDetails.orderedBy.surname = '';
    this.newOrderDetails.orderedBy.userId = 0;
    this.newOrderDetails.products = [];

  }

  clearOtherProduct() {
    this.otherProduct.name = ''
    this.otherProduct.productId = '00000000-0000-0000-0000-000000000000'
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],

    departmentOrderCtrl: [false],

  });
  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    fourthCtrl: ['', Validators.required],
  });

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '550px',
      // height:"700px",
      data: {
        cart: this.cart, drinks: this._drinks, func: this.func,
        addToCart: this.addToCart,
        removeFromCart: this.removeFromCart,
        clearOtherProduct: this.clearOtherProduct,
        otherProduct: this.otherProduct,

        isCartEmpty: this.isCartEmpty,

        find: this.find
      }

    });

    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.cart = []
      this.isCartEmpty = true;
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    });


  }

}



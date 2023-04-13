import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Drinks } from 'src/models/drinks';
import { Order } from 'src/models/order';
import { Product } from 'src/models/product';
import { User } from 'src/models/user';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit {
  @ViewChild('stepper') stepper:MatStepper; 

  
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

  otherProduct: Product = {
    productId: '00000000-0000-0000-0000-000000000000',
    name: '',
    quantity: 0,
    type: ''
  }

  isCartEmpty: boolean = true;
  totalItems: number = 0;


  get_total() {
    var res = 0;

    for (let item of this.cart) {
      if (item.quantity == 0) {
        res += 1;
      }

      else res += item.quantity;
    }

    return this.totalItems = res;
  }



  func(drinkOfChoice: string, op: string, selectedOption?: string) {

    var drink = this._drinks.find(x => x.name == drinkOfChoice)


    if (drink.name == 'Ihlamur' || drink.name == 'Filtre Kahve') {
      console.log(drink.name)
      var qty = drink.quantity
    }
    else {
      var qty = drink.quantityMap.get(selectedOption)
    }


    qty += 1;
    var product = <Product>{

      quantity: qty,
      name: drink.name,
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



  constructor(private orderService: OrderService, private _formBuilder: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar, ) { }






  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 4000 });
  }

  reset()
  {
    //this.stepper.reset()
  }

  ngOnInit(): void {
    this.orderService.getOrders().
      subscribe({
        next: (orders) => {
          this.orderList = orders;
        }
      })

    this.firstFormGroup.controls.departmentOrderCtrl.valueChanges.subscribe(value => {
      this.departmentOrder = value;
    });
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

  }

  addToCart(product: Product) {

    //eğer duplicate varsa quantitysini artır.
    if (this.cart.some(e => e.name == product.name && e.type == product.type)) {
      var filteredProduct = this.cart.find(e => e.name == product.name && e.type == product.type)
      filteredProduct.quantity += 1;

    }

    else {

      //eğer duplicate yoksa
      const newProduct = { ...product };
      this.cart.push(newProduct)
      console.log(this.cart)
      this.clearOtherProduct();


    }
    this.isCartEmpty = false;


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
            this.openSnackBar('Siparişiniz Alınmıştır ✓', 'Kapat');
            this.stepper.reset()
          }
        })
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
    departmentOrderCtrl: [false],

  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    fourthCtrl: ['', Validators.required],
  });

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { cart: this.cart }
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.cart = []
      this.isCartEmpty=true;
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    });


  }

}

//these components may be moved to another file ??

@Component({
  selector: 'app-dialog-component',
  template: `
    <h2 mat-dialog-title>Sepetim</h2>
    <div mat-dialog-content >

    <div *ngIf="data.cart;  else emptyCart">

    <!-- this works. but need cleanup? -->
    

      <div *ngFor="let item of data.cart" >

      <div *ngIf="item.quantity!=0 else noteBlock">

      


      <p> {{item.quantity}} Adet {{item.type | titlecaseTurkish}} {{item.name}} </p>
      
      </div>

      <ng-template #noteBlock>
          <p>
           {{item.name}}</p>
          </ng-template>

      </div>
    </div>

        <ng-template #emptyCart>
          <p>
            Sepetinizde Ürün Bulunmamaktadır.</p>
          </ng-template>

        


    <div mat-dialog-actions>
      <div style= "display: flex; flex-direction:row">
      <button mat-button (click)="closeDialog()">Kapat</button>
      <button mat-button (click)="EmptyCart()">Sepeti Boşalt</button>
      <div>
    </div>
  `
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog() {
    this.dialogRef.close();
  }

  onAdd = new EventEmitter();

  EmptyCart() {
    this.onAdd.emit();
    this.data.cart = []
  }

}





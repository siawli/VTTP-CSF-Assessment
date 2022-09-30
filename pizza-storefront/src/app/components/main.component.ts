import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { checkboxes, Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  form!: FormGroup
  toppingsArr: string[] = []
  chicken!: boolean;
  seafood!: boolean
  beef!: boolean
  vegetables!: boolean
  cheese!: boolean
  arugula!: boolean
  pineapple!: boolean

  email!: boolean
  emailFC = this.fb.control<string | null>('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder,
              private route: Router,
              private pizzaSvc: PizzaService) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.emailFC,
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.fb.control<string>('', [Validators.required]),
      comments: this.fb.control<string>('')
    })
  }

  getOrdersList() {
    let email = this.emailFC.value || null;
    this.getOrders(email!)
    this.route.navigate(['/orders', this.emailFC.value]);
  }

  processForm() {
    console.info(">>>>> processing form")
    let checkBoxes: checkboxes = {
      chicken: this.chicken,
      seafood: this.seafood,
      beef: this.beef,
      vegetables: this.vegetables,
      cheese: this.cheese,
      arugula: this.arugula,
      pineapple: this.pineapple
    }
    console.info(">>> chicken: " + checkBoxes["chicken"])
    for (let k of Object.keys(checkBoxes)) {
      console.info(k)
      if (checkBoxes[k] == true) {
        this.toppingsArr.push(k)
      }
    }
    
    const order: Order = this.form.value as Order;
    order.toppings = this.toppingsArr;

    console.info(">>>> order base: " + order.base)

    this.toppingsArr = [];
    this.route.navigate(['/orders', order.email]);
    this.pizzaSvc.createOrder(order)
      .then(result => this.getOrders(order.email))
      .catch(error => console.info("error in create order: " + error))
    //this.getOrders(order.email);
  }

  getOrders(email: string) { 
    this.pizzaSvc.getOrders(email)
      .then(result => this.pizzaSvc.onGetOrders.next(result))
      .catch(error => console.info(">>> error get orders: " + error))
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

}

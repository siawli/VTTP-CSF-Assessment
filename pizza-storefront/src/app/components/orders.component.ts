import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private pizzaSvc: PizzaService,
              private route: ActivatedRoute) { }

  subGetOrders$!: Subscription
  ordersList: OrderSummary[] = []
  email!: string

  ngOnInit(): void {
    setTimeout(() => 5000)
    this.subGetOrders$ = this.pizzaSvc.onGetOrders.subscribe(
        result => this.ordersList = result
    )

    this.email = this.route.snapshot.params["email"];
  }

  ngOnDestroy(): void {
      this.subGetOrders$.unsubscribe();
  }


}

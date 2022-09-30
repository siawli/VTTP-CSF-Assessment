// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom, Observable, Subject } from "rxjs";
import { Order, OrderSummary } from "./models";

@Injectable()
export class PizzaService {

  constructor(private httpClient: HttpClient) { }

  onGetOrders = new Subject<OrderSummary[]>();

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order: Order) { 
    return firstValueFrom(
      this.httpClient.post<any>("/api/order", order)
    )
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<OrderSummary[]> { 
    let url = "/api/order/" + email + "/all";
    console.info("url get: " + url);
    return firstValueFrom(
      this.httpClient.get<OrderSummary[]>(url)
    )
  }

}

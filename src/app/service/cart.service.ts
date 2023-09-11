import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemDetails } from '../model/item-details'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = 'http://localhost:3000/items'

  constructor(private http: HttpClient) { }

  addItem(item: any) {
    return this.http.post(this.url, item);
  }

  getAllItems() {
    return this.http.get<ItemDetails[]>(this.url);
  }

  deleteItem(id: number) {
    return this.http.delete<ItemDetails>(this.url + '/' + id);
  }

  updateItem(item: any, id: number) {
    return this.http.put<ItemDetails>(this.url + '/' + id, item);
  }
}

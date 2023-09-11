import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ItemDetails } from '../model/item-details';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  itemForm: any;
  cartItems: any[] = [];
  isedit: boolean = false;
  editItemId: any;
  constructor(public cartService: CartService, private http: HttpClient) { }
  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })
    this.getItems();
  }

  addItem() {
    this.cartService.addItem(this.itemForm.value).subscribe(res => {
      this.getItems();
    })
  }
  getItems() {
    this.cartService.getAllItems().subscribe((res: any[]) => {
      console.log(res);
      this.cartItems = res;
    })
  }

  removeItem(id: number) {
    this.cartService.deleteItem(id).subscribe(res => {
      this.getItems();
    })
  }

  editItem(item: any) {
    this.editItemId = item.id;
    this.itemForm.setValue({
      name: item.name,
      price: item.price
    })
    this.isedit = true;
  }

  updateItem() {
    this.cartService.updateItem(this.itemForm.value, this.editItemId).subscribe(res => {
      this.getItems();
    })
    this.itemForm.reset();
    this.isedit = false;
  }
}

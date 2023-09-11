import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemDetails } from '../model/item-details';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent implements OnInit {

  itemForm: any;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {

    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })
  }

  addItem() {
    this.cartService.addItem(this.itemForm.value).subscribe({
      next: (res) => {
        alert('Product added successfully, Please Fetch the data');
        this.itemForm.reset();
      },
      error: () => {
        alert('Error while adding product')
      }
    })
  }
}

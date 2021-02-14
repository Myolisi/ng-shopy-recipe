import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subsscription: Subscription;
  isEditing = false;
  editedItemIndex: number;
  editedItem: Ingredient | Ingredient[];
  @ViewChild('addForm', { static: false }) addForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subsscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.isEditing = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.get(Number(this.editedItemIndex));

      // set default values
      this.addForm.form.patchValue({
        "name": this.editedItem['name'],
        "amount": this.editedItem['amount']
      });
    });
  }

  onAddItem(form: NgForm) {
    //  const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInput.nativeElement.value);
    //  this.shoppingListService.add(ingredient);
    const formData = form.value;
    const ingredient = new Ingredient(formData.name, formData.amount);

    if (this.isEditing) {
      this.shoppingListService.update(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.add(ingredient);
      this.clear();
    }
  }

  clear() {
     this.addForm.reset();
     this.isEditing = false;
  }

  onDelete() {
    this.clear();
    this.shoppingListService.delete(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subsscription.unsubscribe();
  }

}

import { readFileContents } from "../helpers/Helper.js";
import { items } from "../../json/items.js";

export class Item{
 
    constructor(){
        this.items = items;
        this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || []; // Array of objects from local storage
        this.inventory = this.getInventory(this.items);
        this.addInModal(this.inventory);
    }

    addInModal(inventory){
        console.log(inventory);
        inventory.forEach(element => {
            let block = `<div class="inventory-info aligns-items-center justify-content-center mb-4"><img src="${element.sprite}" class="item-sprite"><div class="mt-2">${element.quantity}</div></div>`;
            $(".inventory-left-holder").append(block);
        });
    }

    getInventory(items){
        console.log(items);
        return items
            .filter(item => this.inventoryStorage.some(inventoryItem => inventoryItem.id === item.id))
            .map(item => {
            const matchingInventoryItem = this.inventoryStorage.find(inventoryItem => inventoryItem.id === item.id);
            item.quantity = matchingInventoryItem ? matchingInventoryItem.quantity : 0;
            return item;
            })
            .filter(item => item.quantity > 0);
    }


    addInInventory(id,qty){
        const itemId = parseInt(id);
        const quantity = parseInt(qty);
        const existingItem = this.inventoryStorage.find(item => item.id === itemId);
 
        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          this.inventoryStorage.push({"id": itemId, "quantity": quantity });
        }
        console.log(this.inventoryStorage);
        localStorage.setItem('inventory', JSON.stringify(this.inventoryStorage));
        this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || [];
    }

    removeFromInventory(id,qty){
        const itemId = parseInt(id);
        const quantity = parseInt(qty);
        const itemIndex = this.inventoryStorage.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
          const existingItem = this.inventoryStorage[itemIndex];
    
          if (quantity < existingItem.quantity) {
            existingItem.quantity -= quantity;
          } else if (quantity === existingItem.quantity) {
            this.inventoryStorage.splice(itemIndex, 1);
          } else{
            alert("cannot remove move items than u have");
          }
    
          localStorage.setItem('inventory', JSON.stringify(this.inventoryStorage));
          this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || [];
        }
    }
    
}
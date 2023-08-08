import { readFileContents } from "../helpers/Helper.js";
import { items } from "../../json/items.js";

export class Item {

    constructor() {
        this.items = items;
        this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || []; // Array of objects from local storage
        this.inventory = this.getInventory(this.items);
        this.addInModal(this.inventory);
    }

    addInModal(inventory) {
        console.log(inventory);
        inventory.forEach(element => {
            let block = `<div class="inventory-info aligns-items-center justify-content-center mb-4"><img src="${element.sprite}" class="item-sprite" id="${element.id}"><div class="mt-2">${element.quantity}</div></div>`;
            $(".inventory-left-holder").append(block);
        });
        $('.item-sprite').on('click', (event) => {
            const id = $(event.currentTarget).attr('id');
            console.log('id', id);
            const clickedElement = inventory.find(element => element.id == id);

            if (clickedElement) {
                $(".inventory-right-holder").empty(); // Clear the contents before appending

                let block = `<div id="inventory-detail" class="d-flex">
                <div class="inventory-info aligns-items-center justify-content-center mb-2">
                    <img src="${clickedElement.sprite}" class="item-sprite" id="${clickedElement.id}">
                </div>
                <div id="inventory-form mt-5">
                    <div class="input-group input-group-sm m-3">
                        <input type="text" class="form-control character-data" id="item-name" value="${clickedElement.name}" readonly>
                    </div>

                </div>
                
                </div>
                <table class="table border-1 table-sm" style="font-size:13px; padding:0px;">
                    <thead>
                        <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody  class="table-group-divider">
                        <tr>
                        <td>${clickedElement.type}</td>
                        <td>${clickedElement.amount}</td>
                        <td>${clickedElement.quantity}</td>
                        <td>${clickedElement.price}</td>
                        </tr>
                        <tr>
                        
                    </tbody>
                </table>
                <div class="description">${clickedElement.description}</div>`;
                $(".inventory-right-holder").append(block);
            }

        });
    }

    getInventory(items){
        return items
            .filter(item => this.inventoryStorage.some(inventoryItem => inventoryItem.id === item.id))
            .map(item => {
                const matchingInventoryItem = this.inventoryStorage.find(inventoryItem => inventoryItem.id === item.id);
                item.quantity = matchingInventoryItem ? matchingInventoryItem.quantity : 0;
                return item;
            })
            .filter(item => item.quantity > 0);
    }


    addInInventory(id, qty) {
        const itemId = parseInt(id);
        const quantity = parseInt(qty);
        const existingItem = this.inventoryStorage.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            this.inventoryStorage.push({ "id": itemId, "quantity": quantity });
        }
        console.log(this.inventoryStorage);
        localStorage.setItem('inventory', JSON.stringify(this.inventoryStorage));
        this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || [];
    }

    removeFromInventory(id, qty) {
        const itemId = parseInt(id);
        const quantity = parseInt(qty);
        const itemIndex = this.inventoryStorage.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
            const existingItem = this.inventoryStorage[itemIndex];

            if (quantity < existingItem.quantity) {
                existingItem.quantity -= quantity;
            } else if (quantity === existingItem.quantity) {
                this.inventoryStorage.splice(itemIndex, 1);
            } else {
                alert("cannot remove move items than u have");
            }

            localStorage.setItem('inventory', JSON.stringify(this.inventoryStorage));
            this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || [];
        }
    }

}
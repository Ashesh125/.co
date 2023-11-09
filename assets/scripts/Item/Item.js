import { items } from "../../json/items.js";
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";
import { distanceFormula } from "../helpers/Helper.js";
import { animateHeal } from "../helpers/Animations.js";

export class Item {

    constructor() {
        this.items = items;
        this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || []; // Array of objects from local storage
        this.inventory = this.getInventory(this.items);
    }

    addInModal() {
        $(".inventory-left-holder").empty()
        let inventory = this.inventory;
        console.log('inventory local storage:',this.inventoryStorage);
        console.log('inventory:',this.inventory);
        inventory.forEach(element => {
            let block = `<div class="inventory-info aligns-items-center justify-content-center m-1 mb-4"><img src="${element.sprite}" class="item-sprite" id="${element.id}"><div class="mt-2">${element.quantity}</div></div>`;
            $(".inventory-left-holder").append(block);
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
        console.log('adding',id,qty)
        const existingItem = this.inventoryStorage.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.inventoryStorage.push({ "id": itemId, "quantity": quantity });
        }
        console.log("after added",this.inventoryStorage);
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
                Swal.fire('You do not have Enough items!!!');
                return false;
            }

            localStorage.setItem('inventory', JSON.stringify(this.inventoryStorage));
            this.inventoryStorage = JSON.parse(localStorage.getItem('inventory')) || [];
            return true;
        } else {
            Swal.fire('You do not have that item!!!');
            return false;
        }
    }

    useCharacterConsumable(id,characterId){
        var usedItem = this.inventory.find(function (element) {
            return element.id === id;
        });

        const characters = JSON.parse(localStorage.getItem("characters"));
        const character = characters.find(character => character.id === parseInt(characterId));

        switch(usedItem.type){
            case 'heal':
                if(character.stats.currentHp < character.stats.health){
                    character.stats.currentHp += usedItem.amount;
                    if(character.stats.currentHp > character.stats.health){
                        character.stats.currentHp = character.stats.health;
                    }
                }
                animateHeal(character.id);
                const updatedCharacters = characters.map(c => {
                    if (c.id === characterId) {
                        return character;
                    }
                    return c;
                });
                
                localStorage.setItem("characters", JSON.stringify(updatedCharacters));
                console.log(JSON.parse(localStorage.getItem('characters')))
                break;

        }  
        
        this.removeFromInventory(id,1);  
    }    


    useWorldConsumable(id,world){
        let towns;
        var usedItem = this.inventory.find(function (element) {
            return element.id === id;
        });
        switch(usedItem.type){
            case 'warp_town':
                $(".towns-list").empty();
                $("#waypoint-confirmation-modal").modal('toggle');
                towns = JSON.parse(localStorage.getItem('towns'));
                towns.forEach(town => {
                        let gold_cost = 0;
                        $(".towns-list").append(`
                            <div class="border border-1 m-1 p-2 town-block">
                                <div class="fs-6">(${town.id})</div>
                                <div>${town.name} <span class="float-end">
                                    <span class="icon gold-icon col-2">
                                        <img src="../sprites/Golden Coin.png">
                                        <span>${gold_cost}</span>
                                    </span>
                                </div>
                                <div><button class='btn btn-primary teleport-btn' id="teleport-${town.id}-${gold_cost}">Teleport</button></div>
                            </div>
                        `);
                    
                });
                break;    

            case "warp_nearest_town":
                let nearestTown;
                let lowestGoldCost = Infinity; 
                towns = JSON.parse(localStorage.getItem('towns'));
                towns.forEach(town => {
                    const gold_cost = Math.ceil(distanceFormula(town.coordinates, { x: parseInt(world.player.coordinates.x), z: parseInt(world.player.coordinates.z) }) / 2);
                    if (gold_cost < lowestGoldCost) {
                        lowestGoldCost = gold_cost;
                        nearestTown = town;
                    }
                });
                if (nearestTown) {
                    world.coordinates.x = nearestTown.coordinates.x;
                    world.coordinates.z = nearestTown.coordinates.z;
        
                    world.player.x = nearestTown.position.x;
                    world.player.z = nearestTown.position.z;
                } 
                break;
        }

        this.removeFromInventory(id,1);
    }

}
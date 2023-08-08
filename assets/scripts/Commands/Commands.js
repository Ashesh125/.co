import { Item } from "../Item/Item.js";

const regex = {
    tp: /^\/tp (\d+) (\d+) (\d*) (\d*)$|^\/tp (\d+) (\d+)$/,
    give: /^\/give\s+\d+(\s+\d+)?$/,
    remove: /^\/remove\s+\d+(\s+\d+)?$/,
    coordinates: /^\/coordinates$/,
    tpTown: /^\/town\s+\w+$/,
  };

export class Commands{

    constructor(world,save){
        this.save = save;
        this.world = world;
        this.input = $("#command-input");
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.input.on("keypress", (event) => {
            if (event.which === 13) {
                this.handleEnterKeyPressed();
            }
        });
    }

    handleEnterKeyPressed() {
        //tp 50000 50000
        if(regex.tp.test(this.input.val())){
            let coords = this.input.val().split(" ");
            this.world.coordinates.x = coords[1];
            this.world.coordinates.z = coords[2];
            this.world.player.x = parseInt(coords[3] || 5);
            this.world.player.z = parseInt(coords[4] || 5);
        }else if (regex.give.test(this.input.val())){
            let id = this.input.val().split(" ");
            let qty = id[2] || 1;
            let item = new Item();
            item.addInInventory(id[1],qty);
        }else if(regex.remove.test(this.input.val())){
            let id = this.input.val().split(" ");
            let qty = id[2] || 1;
            let item = new Item();
            item.removeFromInventory(id[1],qty);
        }else if(regex.coordinates.test(this.input.val())){
            this.input.val(this.world.coordinates.x+" "+this.world.coordinates.z);
            return;
        }else if(regex.tpTown.test(this.input.val())){
            const towns = JSON.parse(localStorage.getItem("towns"));
            const id = this.input.val().split(" ");

            const foundTown = towns.find((town) => town.id === id[1]);

            if (foundTown) {
                this.world.coordinates.x = foundTown.coordinates.x;
                this.world.coordinates.z = foundTown.coordinates.z;
    
                this.world.player.x = foundTown.position.x;
                this.world.player.z = foundTown.position.z;
            } 
        }
        this.save.saveGame(this.world);
        window.location.reload();
    }
}
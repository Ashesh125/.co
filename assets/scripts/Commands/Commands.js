import { Item } from "../Item/Item.js";

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
        if(/^\/tp\s+\d+(\.\d+)?\s+\d+(\.\d+)?$/.test(this.input.val())){
            let coords = this.input.val().split(" ");
            this.world.coordinates.x = coords[1];
            this.world.coordinates.z = coords[2];
        }else if (/^\/give\s+\d+(\s+\d+)?$/.test(this.input.val())){
            let id = this.input.val().split(" ");
            let qty = id[2] || 1;
            let item = new Item();
            item.addInInventory(id[1],qty);
        }else if(/^\/remove\s+\d+(\s+\d+)?$/.test(this.input.val())){
            let id = this.input.val().split(" ");
            let qty = id[2] || 1;
            let item = new Item();
            item.removeFromInventory(id[1],qty);
        }else if("/coordinates"){
            this.input.val(this.world.coordinates.x+" "+this.world.coordinates.z);
            return;
        }
        this.save.saveGame(this.world);
        window.location.reload();
    }
}
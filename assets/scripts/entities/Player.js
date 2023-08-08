import { Tile } from "../world/Tile.js";
import { distanceFormula } from "../helpers/Helper.js";
import { World } from "../world/World.js";

export class Player{

    constructor(game,audio) {
        //read values
        this.x = game.x;
        this.z = game.z;
        this.chunk_id = null;
        this.chunkChanged = false;
        this.tile = new Tile(this.chunk_id, this.x, this.z);
        this.sprite = null;
        this.gold = game.gold;
        this.inPOI = null;
        this.coordinates = game.coordinates;
        this.audio = audio;
    }

    move(dir){
        switch(dir){
            case 'left':
                return this.inPOI == null ? this.moveInWorld(0,-1) : this.moveInPOI(0,-1);
                break;

            case 'right':
                return this.inPOI == null ? this.moveInWorld(0,1) : this.moveInPOI(0,1);
                break;

            case 'up':
                return this.inPOI == null ? this.moveInWorld(-1,0) : this.moveInPOI(-1,0);
                break;

            case 'down':
                return this.inPOI == null ? this.moveInWorld(1,0) : this.moveInPOI(1,0);
                break;
        }
    }

    moveInPOI(x,z){
        let next_position = {x: null,z: null};
        next_position.x = this.tile.position.x + x;
        next_position.z = this.tile.position.z + z;
        
        console.log("s", this.inPOI.id,next_position.x,next_position.z);
        if(this.checkObstackle(this.inPOI.id,next_position.x,next_position.z)){
            console.log('obstackle at:'+this.inPOI.id+"/"+next_position.x+","+next_position.z);
            return false;
        }else if(this.checkManxe(this.inPOI.id,next_position.x,next_position.z)){
            console.log('manxe at:'+this.inPOI.id+"/"+next_position.x+","+next_position.z);
            return false;
        }else if(this.checkExit(this.inPOI.id,next_position.x,next_position.z)){
            this.x = this.inPOI.location.x;
            this.z = this.inPOI.location.z;
            this.inPOI = null;
            this.placeInTile(this.chunk_id,this.x,this.z);
            this.audio.stop();
            this.audio.play('world');
            $("#POIModal").modal('hide');
            return false;
        }else if(this.checkWaypoint(this.inPOI.id,next_position.x,next_position.z)){
            $(".towns-list").empty();
            $("#waypoint-confirmation-modal").modal('toggle');
            const towns = JSON.parse(localStorage.getItem('towns'));
            towns.forEach(town => {
                if (this.inPOI.id !== town.id) {
                    let gold_cost = Math.ceil(distanceFormula(town.coordinates, { x: parseInt(this.coordinates.x), z: parseInt(this.coordinates.z) }) / 2);
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
                }
            });
            return false;
        }else{   
            this.x = next_position.x;
            this.z = next_position.z;
            return true;
        }
    }

    placeInTile(c,x,z){
        $(".tile").removeClass("player");
        
        let tile = new Tile(c, x, z);
        console.log(tile);
        tile.addClass('player');
    }

    moveInWorld(x,z){
        let next_position = {c: null,x: null,z: null};
        if(z == 0){
            if(this.x == 0 && x == -1){
                next_position.x = 9;
                next_position.z = this.z;
                next_position.c = this.chunk_id - 3;
            }else if(this.x == 9 && x == 1){
                next_position.x = 0;
                next_position.z = this.z;
                next_position.c = this.chunk_id + 3;
            }else{
                next_position.x = this.x + x;
                next_position.z = this.z;
                next_position.c = this.chunk_id;
            }    
        }else{
            if(this.z == 0 && z == -1){
                next_position.x = this.x;
                next_position.z = 9;
                next_position.c = this.chunk_id - 1;
            }else if(this.z == 9 && z == 1){
                next_position.x = this.x;
                next_position.z = 0;
                next_position.c = this.chunk_id + 1;
            }else{
                next_position.x = this.x;
                next_position.z = this.z + z; 
                next_position.c = this.chunk_id;
            } 
        }
        
        if(this.chunk_id != next_position.c){
            this.chunkChanged = true;
        }else{
            this.chunkChanged = false;
        }
        
        //check obstackle    
        if(this.checkObstackle(next_position.c,next_position.x,next_position.z)){
            console.log('obstackle at:'+next_position.c+"/"+next_position.x+","+next_position.z);
            return false;
        }else{   
            this.x = next_position.x;
            this.z = next_position.z;
            console.log('new positoin:'+next_position.c+"/"+next_position.x+","+next_position.z);
            return true;
        }
    }

    checkObstackle(c,x,z){
        let tile = new Tile(c,x,z);
        // console.log(tile);
        return tile.checkTile('water');
    }

    checkManxe(c,x,z){
        let tile = new Tile(c,x,z);
        // console.log(tile);
        return tile.checkTile('manxe');
    }

    checkExit(c,x,z){
        let tile = new Tile(c,x,z);
        // console.log(tile);
        return tile.checkTile('exit');
    }

    checkWaypoint(c,x,z){
        let tile = new Tile(c,x,z);
        // console.log(tile);
        return tile.checkTile('waypoint');
    }

}

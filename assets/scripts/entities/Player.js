import { Tile } from "../world/Tile.js";

export class Player{

    constructor(c,x,z) {
        //read values
        this.x = x;
        this.z = z;
        this.chunk_id = c;
        this.chunkChanged = false;
        this.tile = new Tile(this.chunk_id, this.x, this.z);
        this.sprite = null;
        this.gold = null;
    }

    moveInWorld(dir){
        switch(dir){
            case 'left':
                return this.move(0,-1);
                break;

            case 'right':
                return this.move(0,1);
                break;

            case 'up':
                return this.move(-1,0);
                break;

            case 'down':
                return this.move(1,0);
                break;
        }
    }

    move(x,z){
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
                console.log(next_position);
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
        if(this.checkWorldObstackle(next_position.c,next_position.x,next_position.z)){
            console.log('obstackle at:'+next_position.c+"/"+next_position.x+","+next_position.z);
            return false;
        }else{   
            this.x = next_position.x;
            this.z = next_position.z;
            console.log("new pos:"+this.chunk_id+"/"+this.x+","+this.z)
            return true;
        }
    }

    checkWorldObstackle(c,x,z){
        let tile = new Tile(c,x,z);
        // console.log(tile);
        return tile.checkTile('water');
    }

}
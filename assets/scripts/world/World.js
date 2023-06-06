import {ChunkManager} from './ChunkManager.js';
import { Helper } from '../helpers/Helper.js';
import { Tile } from './Tile.js';
import { Player } from '../entities/Player.js';

export class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator);
        this.helper = new Helper();
        this.renderDistance = 1
        this.loadDistance = 2
        this.player = new Player(5,5,5);
    }

    draw(renderer) {
        const chunks = this.chunkManager.chunks
        for (var iChunk in chunks) {
            const chunk = chunks[iChunk]
            const chunkElement = chunk.element
            chunkElement.draw(renderer)
        }
    }

    loadChunks() {
        var isBuffered = false
        // var cameraX = parseInt(camera.position.x / 10)
        // var cameraZ = parseInt(camera.position.z / 10)
        
        let x = 50000;
        let z = 50000;
        this.chunkManager.load(x * 10-10, z * 10+10);//0
        this.chunkManager.load(x * 10+0, z * 10+10);//1
        this.chunkManager.load(x * 10+10, z * 10+10);//2
        this.chunkManager.load(x * 10-10, z * 10+0);//3
        this.chunkManager.load(x * 10, z * 10);//4
        this.chunkManager.load(x * 10+10, z * 10+0);//5
        this.chunkManager.load(x * 10-10, z * 10-10);//6
        this.chunkManager.load(x * 10+0, z * 10-10);//7
        this.chunkManager.load(x * 10+10, z * 10-10);//8
        isBuffered = this.chunkManager.addToBuffer(x * 10, z * 10);
        if(!isBuffered){
            this.loadDistance++
        }
        if(this.loadDistance > this.renderDistance){
            this.loadDistance = 2
        }
    }

    placePlayer(){
        //remove player from world
        console.log(this.player);
        $("div").removeClass("player");
        //if current data doesnt exists
        if(this.player.chunk_id){
            let tile = new Tile(this.player.chunk_id, this.player.x, this.player.z);
            tile.addClass('player');
        }else{ // put in center of world
            //check 0,0 is suitable
            let id = 4;
            let freePosition = this.helper.spiralTraverseGraph(id);
            let tile = new Tile(id, freePosition.x, freePosition.z);
            tile.addClass('player');
            
            if(true){

            }else{// put in random suitable near 0,0

            }
        } 
    }

    action(key){
        switch(key){
            case "ArrowRight":
                this.player.moveInWorld('right') ? this.placePlayer() : "";
                break;

            case "ArrowLeft":
                this.player.moveInWorld('left') ? this.placePlayer() : "";
                break;

            case "ArrowUp":
                this.player.moveInWorld('up') ? this.placePlayer() : "";
                break;

            case "ArrowDown":
                this.player.moveInWorld('down') ? this.placePlayer() : "";
                break;
        }
    }
}
import {ChunkManager} from './ChunkManager.js';
import { Helper } from '../helpers/Helper.js';
import { Tile } from './Tile.js';
import { Player } from '../entities/Player.js';

export class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator);
        this.helper = new Helper();
        this.renderDistance = 1;
        this.loadDistance = 2;
        this.coordinates = {x: 50000,z: 50000};
        this.player = new Player(null,5,5);
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
        this.chunkManager.chunks = [];
        this.chunkManager.loadChunkRow(0, this.coordinates.x, this.coordinates.z);
        this.chunkManager.loadChunkRow(1, this.coordinates.x, this.coordinates.z);
        this.chunkManager.loadChunkRow(2, this.coordinates.x, this.coordinates.z);

        isBuffered = this.chunkManager.addToBuffer(this.coordinates.x * 10, this.coordinates.z * 10);
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
            let id = 5;
            let freePosition = this.helper.spiralTraverseGraph(id);
            let tile = new Tile(id, freePosition.x, freePosition.z);
            tile.addClass('player');
            this.player.chunk_id = id;
            this.player.x = freePosition.x;
            this.player.z =  freePosition.z;
            if(true){

            }else{// put in random suitable near 0,0

            }
        } 
    }

    action(key){
        switch(key){
            case "ArrowRight":
                if(this.player.moveInWorld('right')){
                    if(this.player.chunkChanged){
                        this.coordinates = this.chunkManager.moveChunks(this.coordinates,'right');
                        this.loadChunks();
                    }
                    
                    this.placePlayer();
                }
                break;

            case "ArrowLeft":
                if(this.player.moveInWorld('left')){
                    if(this.player.chunkChanged){
                        this.coordinates = this.chunkManager.moveChunks(this.coordinates,'left');
                        this.loadChunks();
                    }
                    
                    this.placePlayer();
                }
                break;

            case "ArrowUp":
                if(this.player.moveInWorld('up')){
                    if(this.player.chunkChanged){
                        this.coordinates = this.chunkManager.moveChunks(this.coordinates,'up');
                        this.loadChunks();
                    }
                    
                    this.placePlayer();
                }
                break;

            case "ArrowDown":
                if(this.player.moveInWorld('down')){
                    if(this.player.chunkChanged){
                        this.coordinates = this.chunkManager.moveChunks(this.coordinates,'down');
                        this.loadChunks();
                    }
                    this.placePlayer();
                }
                break;
        }
    }
}
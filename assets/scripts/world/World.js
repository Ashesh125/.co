import {ChunkManager} from './ChunkManager.js';
import { Tile } from './Tile.js';
import { Player } from '../entities/Player.js';
import { Town } from '../POI/Town.js';
import { spiralTraverseGraph,generateRandomNumber01 } from '../helpers/Helper.js';


export class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator);
        this.renderDistance = 1;
        this.loadDistance = 2;
        this.coordinates = {x: 50000,z: 50000};
        this.player = new Player(null,5,5);
        this.currentPOI = null;
    }

    loadSaveState(save){
        this.coordinates = {x: save.world.player.position.x, z: save.world.player.position.z};
        this.player = new Player(null, save.world.player.position.x, save.world.player.position.z);
        this.loadChunks();
        this.placePlayer();
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
        $(".tile").removeClass("player");
        //if current data doesnt exists
        if(this.player.chunk_id){
            let tile = new Tile(this.player.chunk_id, this.player.x, this.player.z);
            tile.addClass('player');
            this.player.tile = new Tile(this.player.chunk_id, this.player.x, this.player.z);
        }else{ // put in center of world
            //check 0,0 is suitable
            let id = 5;
            let freePosition = spiralTraverseGraph(id);
            let tile = new Tile(id, freePosition.x, freePosition.z);
            tile.addClass('player');
            this.player.chunk_id = id;
            this.player.x = freePosition.x;
            this.player.z =  freePosition.z;
            this.player.tile = new Tile(id, freePosition.x, freePosition.z);    
        } 
        if(this.player.tile.checkTile('town')){
            this.enterPOI(this.player.tile.getPOI());
        }        
    }

    enterPOI(POI){
        const parts = POI.split("-");
        this.currentPOI = new Town(parts[1],this.player,this.coordinates);
    }

    action(key){
        if(key == "Escape"){
            $('#menuModal').modal('toggle');   
        }else
        if(this.player.inPOI == null){
            switch(key){
                case "ArrowRight":
                    if(this.player.move('right')){
                        if(this.player.chunkChanged){
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates,'right');
                            this.loadChunks();
                        }
                        
                        this.placePlayer();
                        this.checkEncounter();
                    }
                    break;
    
                case "ArrowLeft":
                    if(this.player.move('left')){
                        if(this.player.chunkChanged){
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates,'left');
                            this.loadChunks();
                        }
                        
                        this.placePlayer();this.checkEncounter();
                    }
                    break;
    
                case "ArrowUp":
                    if(this.player.move('up')){
                        if(this.player.chunkChanged){
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates,'up');
                            this.loadChunks();
                        }
                        
                        this.placePlayer();this.checkEncounter();
                    }
                    break;
    
                case "ArrowDown":
                    if(this.player.move('down')){
                        if(this.player.chunkChanged){
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates,'down');
                            this.loadChunks();
                        }
                        this.placePlayer();this.checkEncounter();
                    }
                    break;
            }
        }else{
            switch(key){
                case "ArrowRight":
                    if(this.player.move('right')){
                        this.currentPOI.placePlayer();  
                    }
                    break;
    
                case "ArrowLeft":
                    if(this.player.move('left')){
                        this.currentPOI.placePlayer();
                    }
                    break;
    
                case "ArrowUp":
                    if(this.player.move('up')){
                        this.currentPOI.placePlayer();
                    }
                    break;
    
                case "ArrowDown":
                    if(this.player.move('down')){
                        this.currentPOI.placePlayer();
                    }
                    break;
            }
        }
        
    }

    checkEncounter(){
        let encounter = this.player.tile.getEncounterChance();  
        let rng = generateRandomNumber01();
        if(false && rng <= encounter ){
            alert("enemy");
        }
    }
}
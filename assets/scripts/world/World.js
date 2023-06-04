import {ChunkManager} from './ChunkManager.js';
import { Helper } from '../helpers/Helper.js';

export class World {
    constructor(noiseGenerator) {
        this.chunkManager = new ChunkManager(noiseGenerator);
        this.helper = new Helper();
        this.renderDistance = 1
        this.loadDistance = 2
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
        
        let x = 10000;
        let z = 10000;
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

    placePlayer(player){
        //if current data doesnt exists
        if(player.position){

        }else{ // put in center of world
            //check 0,0 is suitable
            let tile = this.helper.spiralTraverseGraph(4);
            console.log(tile);
            if(true){

            }else{// put in random suitable near 0,0

            }
        } 
    }
}
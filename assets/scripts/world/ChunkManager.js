import { TerrainGenerator } from "./TerrainGenerator.js";
import { Chunk } from "./Chunk.js";

var counter = 1 ;

export class ChunkManager{
    constructor(noiseGenerator){
        this.chunks = [];
        this.terrainGenerator = new TerrainGenerator(noiseGenerator);
    }

    getChunkAt(x, z){
        return this.chunks.find((element) => element.x === x && element.z === z)
    }

    getChunk(x, z){
        const chunk = this.getChunkAt(x, z)
        if(!chunk){
            if(counter > 9){
                counter = 1;
            }
            const element = new Chunk({ x, z }, counter++)
            this.chunks.push({x, z, element})
            // console.log(element);
        }
        return this.getChunkAt(x, z).element
    }

    getMainChunk(x,z){
        return this.terrainGenerator.getChunk(new Chunk({ x, z }, 0));
    }

    load(x, z){
        var chunk = this.getChunk(x, z);
        chunk.load(this.terrainGenerator)
    }

    addToBuffer(x, z){
        var chunk = this.getChunk(x, z)
        return chunk.addToBuffer()
    }


    loadChunkRow(row,x,z){
        switch(row){
            case 0:
                this.load(x * 10-10, z * 10+10);//1
                this.load(x * 10+0, z * 10+10);//2
                this.load(x * 10+10, z * 10+10);//3
                break;

            case 1:
                this.load(x * 10-10, z * 10+0);//4
                this.load(x * 10, z * 10);//5
                this.load(x * 10+10, z * 10+0);//6
                break;

            case 2:
                this.load(x * 10-10, z * 10-10);//7
                this.load(x * 10+0, z * 10-10);//8
                this.load(x * 10+10, z * 10-10);//9
                break;
        }
    }

    loadChunkColumn(col,x,z){
        switch(col){
            case 0:
                this.load(x * 10-10, z * 10+10);//1
                this.load(x * 10-10, z * 10+0);//4
                this.load(x * 10-10, z * 10-10);//7
                break;

            case 1:
                this.load(x * 10+0, z * 10+10);//2
                this.load(x * 10, z * 10);//5
                this.load(x * 10+0, z * 10-10);//8
                break;

            case 2:
                this.load(x * 10+10, z * 10+10);//3
                this.load(x * 10+10, z * 10+0);//6
                this.load(x * 10+10, z * 10-10);//9
                break;
        }
    }

    moveChunks(coords,direction){
        switch(direction){
            case 'right':
                return { x: coords.x + 1, z:coords.z };
                break;

            case 'left':
                return { x: coords.x - 1, z:coords.z };
                break;
                
            case 'up':
                return { x: coords.x , z:coords.z + 1 };
                break;
            
            case 'down':
                return { x: coords.x , z:coords.z - 1 };
                break;
        }
    }
}
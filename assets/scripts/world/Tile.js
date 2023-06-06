export const TileType = {
    Air: 0,
    Grass: 1,
    Water: 2,
    Sand: 3,
    Dirt: 4,
    Snow: 5
}

export class Tile{
    constructor(c,x,z){
        this.heightMap = 1
        this.chunk = c;
        this.position = {x: x,z: z};
    }

    checkTile(type){
        return document.getElementById(this.chunk+"/"+this.position.x+","+this.position.z).classList.contains(type); 
    }

    addClass(classes){
        document.getElementById(this.chunk+"/"+this.position.x+","+this.position.z).classList.add(classes);
    }

    getTile(){
        console.log(document.getElementById(this.chunk+"/"+this.position.x+","+this.position.z));
    }
}
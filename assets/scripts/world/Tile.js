const TileType = {
    Air: { value: 0, danger: 0 },
    Grass: { value: 1, danger: 0.5 },
    Water: { value: 2, danger: 0 },
    Sand: { value: 3, danger: 0.4 },
    Dirt: { value: 4, danger: 0.5 },
    Snow: { value: 5, danger: 0.3 },
    Forest: { value: 6, danger: 0.6 },
    Town: { value: 7, danger: 0 }
  };

class Tile{
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

    getPOI(){
        const div = document.getElementById(this.chunk+"/"+this.position.x+","+this.position.z);
        const pattern = /[a-zA-Z]+-\d+/;
        // Iterate over classList
        for (var i = 0; i < div.classList.length; i++) {
          if (pattern.test(div.classList[i])) {
            return div.classList[i];
          }
        }
    }

}

export {TileType, Tile};
const TileType = {
    Air: { value: 0, danger: 0 , weight: 0},
    Grass: { value: 1, danger: 0.3, weight: 1 },
    Water: { value: 2, danger: 0, weight: 99 },
    Sand: { value: 3, danger: 0.2, weight: 2 },
    Port : { value: 3.1, danger: 0, weight: 0 },
    Dirt: { value: 4, danger: 0.4, weight: 5 },
    Snow: { value: 5, danger: 0.3, weight: 10 },
    Forest: { value: 6, danger: 0.5, weight: 3 },
    Town: { value: 7, danger: 0, weight: 0 }
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

    getEncounterChance() {
        const list = document.getElementById(this.chunk + "/" + this.position.x + "," + this.position.z).classList;
        let name = list[1];
        const type = name.charAt(0).toUpperCase() + name.slice(1);
        
        return TileType[type] ? TileType[type].danger : 0 ;
      }
}

export {TileType, Tile};
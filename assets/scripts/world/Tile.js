export const TileType = {
    Air: 0,
    Grass: 1,
    Water: 2,
    Sand: 3,
    Dirt: 4,
    Snow: 5
}

export class Tile{
    constructor(){
        this.type = TileType.Air
        this.heightMap = 1
    }
}
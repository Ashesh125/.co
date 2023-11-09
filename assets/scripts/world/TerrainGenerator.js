import { Maths } from './Maths.js';
import { Tile, TileType } from './Tile.js';
import { getRandomInt } from '../helpers/Helper.js';

let SNOW_LEVEL = 255

export class TerrainGenerator {
    constructor(noiseGenerator) {
        this.noiseGenerator = noiseGenerator
        this.chunk = null
        this.configs = {
            octaves: 9,
            amplitude: 100,
            persistance: 1,
            smoothness: 2
        }
        this.noiseGenerator.setConfigs(this.configs)
    }

    generate(chunk) {
        this.chunk = chunk
        const heightMap = this.getHeightMap()

        this.chunk.tiles = heightMap;
        const level = {
                [TileType.Water.value]: 0.1,
                [TileType.Sand.value]: 0.15,
                [TileType.Port.value]: 0.16,
                [TileType.Grass.value]: 0.4,
                [TileType.Forest.value]: 0.6,
                [TileType.Dirt.value]: 0.7,
                [TileType.Town.value]: 0.4154,
            }
            // console.log(chunk); 
        var b = document.getElementById('chunk-' + chunk.id);

        b.innerHTML = '';
        for (var x = 0; x < 10; x++) {
            for (var z = 0; z < 10; z++) {
                var div = document.createElement('div');
                div.classList.add('tile');
                // div.innerHTML = chunk.id+'/'+x+','+z;
                var h = heightMap[x][z];
                if (h < level[TileType.Water.value]) {
                    div.classList.add('water');
                } else if (h < level[TileType.Sand.value]) {
                    div.classList.add('sand');
                } else if (h.toFixed(4) == level[TileType.Port.value]) {
                    div.classList.add('town');
                    div.classList.add('town-'+ (h.toFixed(8)*100000000));
                } else if (h < level[TileType.Grass.value]) {
                    div.classList.add('grass');
                } else if ((h.toFixed(4)) == level[TileType.Town.value]) {
                    div.classList.add('town');
                    div.classList.add('town-' + (h.toFixed(5) * 100000));
                } else if (h < level[TileType.Forest.value]) {
                    div.classList.add('forest');
                } else if (h < level[TileType.Dirt.value]) {
                    div.classList.add('dirt');
                } else {
                    div.classList.add('snow');
                }

                div.id = chunk.id + '/' + x + ',' + z;
                b.appendChild(div);
            }
        }

    }

    getHeightAt(x, z) {
        const h = this.noiseGenerator.perlinNoise(this.chunk.position.x + x, this.chunk.position.z + z)
        return h / SNOW_LEVEL
    }

    getHeightIn(heights, xMin, zMin, xMax, zMax) {
        const bottomLeft = this.getHeightAt(xMin, zMin)
        const bottomRight = this.getHeightAt(xMax, zMin)
        const topLeft = this.getHeightAt(xMin, zMax)
        const topRight = this.getHeightAt(xMax, zMax)
        for (var x = xMin; x < xMax; x++) {
            for (var z = zMin; z < zMax; z++) {
                if (x === 10) continue
                if (z === 10) continue

                var h = Maths.smoothInterpolation(bottomLeft, topLeft, bottomRight, topRight, xMin, xMax, zMin, zMax, x, z)
                if (!heights[x]) {
                    heights[x] = []
                }
                heights[x][z] = h
            }
        }
    }

    getHeightMap() {
        const part = 2
        const PART_SIZE = 10 / part
        var heights = []
        for (var zPart = 0; zPart < part; zPart++) {
            for (var xPart = 0; xPart < part; xPart++) {
                this.getHeightIn(
                    heights,
                    xPart * PART_SIZE,
                    zPart * PART_SIZE,
                    (xPart + 1) * PART_SIZE,
                    (zPart + 1) * PART_SIZE
                )
            }
        }
        return heights
    }
}
import NoiseGenerator from './NoiseGenerator.js';

export class World{
  
  constructor() {  
    this.noiseGenerator = new NoiseGenerator('1231');
  }

  testNoise(){
    let noise = new NoiseGenerator('1231');
    const heightMap = this.getHeightMap();
  }

  getHeightAt(x, z) {
    const h = this.noiseGenerator.perlinNoise(this.chunk.position.x + x, this.chunk.position.z + z)
    return h / SNOW_LEVEL
}

getHeightIn(heights, xMin, zMin, xMax, zMax) {
     let CHUNK_SIZE = 10;
    const bottomLeft = this.getHeightAt(xMin, zMin)
    const bottomRight = this.getHeightAt(xMax, zMin)
    const topLeft = this.getHeightAt(xMin, zMax)
    const topRight = this.getHeightAt(xMax, zMax)
    for (var x = xMin; x < xMax; x++) {
        for (var z = zMin; z < zMax; z++) {
            if (x === CHUNK_SIZE) continue
            if (z === CHUNK_SIZE) continue

            var h = Maths.smoothInterpolation(bottomLeft, topLeft, bottomRight, topRight, xMin, xMax, zMin, zMax, x, z)
            if (!heights[x]) {
                heights[x] = []
            }
            heights[x][z] = h
        }
    }
}

getHeightMap() {
  let CHUNK_SIZE = 10;
    const part = 2
    const PART_SIZE = CHUNK_SIZE / part
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

  createChunks(){
    const chunks = $('.container').find(".chunk");
    chunks.each(function() {
      const chunk = $(this);
      for (let j = 0; j < CHUNK_SIZE; j++) {
        for (let k = 0; k < CHUNK_SIZE; k++) {
          const div = $("<div></div>").addClass("tile");
          
          switch(tileType){
            case 'R':
              div.attr('class','river');
              break;
              
            case 'G':
              div.attr('class','grass');
              break;

            case 'M':
              div.attr('class','mountain');
              break;

            case 'S':
              div.attr('class','sand');
              break;
          }
          div.attr('id',chunk.attr('id')+"/"+j+","+k+")");
          chunk.append(div);
        }
      }
    });
  }

  
}

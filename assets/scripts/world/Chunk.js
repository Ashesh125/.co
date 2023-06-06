let counter = 1;

export class Chunk {
    constructor(position) {
        this.tiles = new Array(10 * 10)
        this.isLoaded = false
        this.isBuffered = false
        this.position = position
        this.id = counter++ ;
    }

    load(generator,id) {
        if (!this.isLoaded) {
            generator.generate(this,id)
            this.isLoaded = true
        }
    }

    setPixel(x, z, type, heightMap = 1) {
        if (!this.pixels[z * 10 + x]) {
            this.pixels[z * 10 + x] = new Pixel()
        }
        this.pixels[z * 10 + x].type = type
        this.pixels[z * 10 + x].heightMap = heightMap
    }

    draw(renderer) {
        if (this.isBuffered) {
            renderer.drawChunk(this)
        }
    }

    addToBuffer() {
        if (!this.isBuffered) {
            this.isBuffered = true
            return true
        }
        return false
    }
}
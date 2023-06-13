export class Chunk {
    constructor(position,id) {
        this.tiles = new Array(10 * 10)
        this.isLoaded = false
        this.isBuffered = false
        this.position = position
        this.id = id;
    }

    load(generator) {
        // if (!this.isLoaded) {
            generator.generate(this);
        //     this.isLoaded = true
        // }
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
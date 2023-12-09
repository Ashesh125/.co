import { ChunkManager } from './ChunkManager.js';
import { Tile } from './Tile.js';
import { Player } from '../entities/Player.js';
import { Town } from '../POI/Town.js';
import { spiralTraverseGraph, generateRandomNumber01,getAddOrSubtractToReachB,moveInDir,inSameChunk } from '../helpers/Helper.js';
import { Book } from './Book.js';
import { Audio } from '../sound/Audio.js';
import { Item } from '../Item/Item.js';
import { Save } from '../save/Save.js';
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";
import { astar } from '../helpers/Algorithms.js';

export class World {
    constructor(noiseGenerator) {
        this.audio = new Audio();
        this.chunkManager = new ChunkManager(noiseGenerator);
        this.renderDistance = 1;
        this.loadDistance = 2;
        this.coordinates = { x: 50000, z: 50000 };
        this.player = new Player({x:5, z:5 ,coordinates:this.coordinates,gold: parseInt($("#gold").val())},this.audio);
        this.currentPOI = null; 
        this.item = new Item();
        this.encounter = true;
        this.save = this.setSave();
    }

    setSave(){
        const game = JSON.parse(localStorage.getItem('gameState'));
        return new Save(game);
    }

    loadSaveState(save) {
        this.coordinates = { x: parseInt(save.world.player.position.x), z: parseInt(save.world.player.position.z) };
        this.player.x = save.world.player.tile.x;
        this.player.z = save.world.player.tile.z;
        this.player.coordinates = this.coordinates;
        this.player.gold = save.gold;
        this.player.chunk_id = 5;
        this.audio.play('world');
        this.loadChunks();
        this.placePlayer();
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
        this.chunkManager.chunks = [];
        this.chunkManager.loadChunkRow(0, this.coordinates.x, this.coordinates.z);
        this.chunkManager.loadChunkRow(1, this.coordinates.x, this.coordinates.z);
        this.chunkManager.loadChunkRow(2, this.coordinates.x, this.coordinates.z);
        isBuffered = this.chunkManager.addToBuffer(this.coordinates.x * 10, this.coordinates.z * 10);
        if (!isBuffered) {
            this.loadDistance++
        }
        if (this.loadDistance > this.renderDistance) {
            this.loadDistance = 2
        }
    }

    placePlayer() {
        //remove player from world
        $(".tile").removeClass("player");
        //if current data doesnt exists
        if (this.player.chunk_id) {
            let tile = new Tile(this.player.chunk_id, this.player.x, this.player.z);
            if (tile.checkTile("water")) {
                let freePosition = spiralTraverseGraph(5, this.player.x, this.player.z);
                tile = new Tile(5, freePosition.x, freePosition.z);
                this.player.chunk_id = 5;
                this.player.x = freePosition.x;
                this.player.z = freePosition.z;
                this.player.tile = tile;
            }
            tile.addClass('player');
            this.player.tile = new Tile(this.player.chunk_id, this.player.x, this.player.z);
        } else { // put in center of world
            //check 5,5 is suitable
            this.player.chunk_id = 5;
            let id = 5;
            let freePosition = spiralTraverseGraph(id, 5, 5);
            let tile = new Tile(id, freePosition.x, freePosition.z);
            tile.addClass('player');
            this.player.chunk_id = id;
            this.player.x = freePosition.x;
            this.player.z = freePosition.z;
            this.player.tile = new Tile(id, freePosition.x, freePosition.z);
        }

        if (this.player.tile.checkTile('town')) {
            this.enterPOI(this.player.tile.getPOI());
        }
    }

    enterPOI(POI) {
        const parts = POI.split("-");
        this.currentPOI = new Town(parts[1], this.player, this.coordinates); 
        this.audio.play("town");
        if(!this.currentPOI.needsPath){
            this.generatePath(this.currentPOI);
        } 
    }

    generatePath(town){
        if(town.needsPath){
            return false;
        }

        let nearestTown = this.currentPOI.getNearestTown();
        if(!nearestTown) { return; }
        this.getPath(town.coordinates.x,town.coordinates.z,town.location.x,town.location.z,nearestTown);
        this.save.saveGame(this);
        // window.location.reload();
    }

    getPath(x,z,px,pz,nearestTown){
        console.log("initialize:",x,z,px,pz);
        let currentMatrix = this.chunkManager.getMainChunk(x * 10, z * 10);
 
        var path;
        const start = [px,pz];
        let end = [];
        console.log({x: x,z: z},nearestTown.coordinates);
        if(inSameChunk({x: x,z: z},nearestTown.coordinates)){
            end = [nearestTown.position.x, nearestTown.position.z];
            path = astar(currentMatrix, start, end);
            this.storePath(path,x,z,currentMatrix);
        }else{
            let dir = getAddOrSubtractToReachB({x:x*10,z: z*10},{x: nearestTown.coordinates.x*10,z:nearestTown.coordinates.z*10});

            const points = moveInDir(dir,px,pz);  
     
            const end = points.a;
            path = astar(currentMatrix, start, end);
            console.log("chunk:",x,z,'end:',end[0] ,end[1]);
            console.log(dir,points,end);
            console.log('path inbetween',path);
            console.log("next",x + points.b[0],z + points.b[1], points.c[0] ,points.c[1]);
            console.log("<++++++++++++++++++++++++++++++++++++++++++++++>")

            this.storePath(path,x,z,currentMatrix);

            this.getPath(x + points.b[0],z + points.b[1], points.c[0] ,points.c[1],nearestTown);
        }
    }

    storePath(path,x,z,currentMatrix){
        let paths = JSON.parse(localStorage.getItem('paths'));
        path.forEach(function (element) {
            const modifiedPath = [x * 10 + element[0], z * 10 + element[1]];
           
            const exists = paths.some(existingPath => {  
                return existingPath[0] === modifiedPath[0] && existingPath[1] === modifiedPath[1];
            });

            if (!exists && (currentMatrix ? currentMatrix[element[0]][element[1]] !== 0 : false)) {
                paths.push(modifiedPath);
            }
        });

        localStorage.setItem('paths', JSON.stringify(paths));
    }

    action(key) {
        switch (key) {
            case "Escape":
                $('#menuModal').modal('toggle');
                break;

            case "Delete":
                localStorage.clear();
                break;
            case "I":
            case "i":
                this.item = new Item();
                this.item.addInModal();
                $("#inventory-modal").modal("toggle");
                const book = new Book();
                // book.getCharacterData();
                break;
                // case "c":
                //     $("#character-profile-modal").modal("toggle");
                //    
                //     break;

            case 'm':

                break;

        }

        if (this.player.inPOI == null) {
            switch (key) {
                case "ArrowRight":
                    if (this.player.move('right')) {
                        if (this.player.chunkChanged) {
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates, 'right');
                            this.loadChunks();
                        }

                        this.placePlayer();
                        if (this.encounter) { this.checkEncounter() };
                    }
                    break;

                case "ArrowLeft":
                    if (this.player.move('left')) {
                        if (this.player.chunkChanged) {
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates, 'left');
                            this.loadChunks();
                        }

                        this.placePlayer();
                        if (this.encounter) { this.checkEncounter() };
                    }
                    break;

                case "ArrowUp":
                    if (this.player.move('up')) {
                        if (this.player.chunkChanged) {
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates, 'up');
                            this.loadChunks();
                        }

                        this.placePlayer();
                        if (this.encounter) { this.checkEncounter() };
                    }
                    break;

                case "ArrowDown":
                    if (this.player.move('down')) {
                        if (this.player.chunkChanged) {
                            this.coordinates = this.chunkManager.moveChunks(this.coordinates, 'down');
                            this.loadChunks();
                        }
                        this.placePlayer();
                        if (this.encounter) { this.checkEncounter() };
                    }
                    break;
            }
        } else {
            switch (key) {
                case "ArrowRight":
                    if (this.player.move('right')) {
                        this.currentPOI.placePlayer();
                    }
                    break;

                case "ArrowLeft":
                    if (this.player.move('left')) {
                        this.currentPOI.placePlayer();
                    }
                    break;

                case "ArrowUp":
                    if (this.player.move('up')) {
                        this.currentPOI.placePlayer();
                    }
                    break;

                case "ArrowDown":
                    if (this.player.move('down')) {
                        this.currentPOI.placePlayer();
                    }
                    break;
            }
        }

    }

    checkEncounter() {
        let encounter = this.player.tile.getEncounterChance();
        let rng = generateRandomNumber01();
        if (rng <= encounter) {
            $(".save-button").click();
            this.audio.play("combat");
            anime({
                targets: '.chunk',
                scale: [
                    { value: .1, easing: 'easeOutSine', duration: 500 },
                    { value: 5, easing: 'easeInOutQuad', duration: 1200 }
                ],
                delay: anime.stagger(200, { grid: [3, 3], from: 'center' }),
                complete: function(anim) {

                    setTimeout(() => {
                        window.location.href = "./battlefield.html";
                    },2000);
                }
            });
        }
    }

    buy(value) {
        if (value < this.player.gold) {
            this.player.gold -= parseInt(value);
            $("#gold").val(this.player.gold);
            this.item.addInInventory($('#selling-item-id').val(), 1);
            this.updateGold();
            $("#merchant-modal").modal("toggle");
        } else {
            Swal.fire('Not enough Gold!!!');
        }
    }

    sell(value) {
        if (this.item.removeFromInventory($('#buying-item-id').val(), $("#buying-item-qty").val())) {
            this.player.gold += parseInt(value);
            $("#gold").val(this.player.gold);
        }
        this.updateGold();
        $("#guild-modal").modal("toggle");
    }

    healAll(value){
        this.player.gold -= parseInt(value);
        let characters = JSON.parse(localStorage.getItem("characters"));
        characters.forEach(character => {
            character.stats.currentHp = character.stats.health;
        });
        localStorage.setItem("characters", JSON.stringify(characters));
        this.updateGold();
        $("#healer-modal").modal("toggle");
    }
    
    updateGold(){
        $("#gold").val(this.player.gold);
    }
}
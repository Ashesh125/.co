import { Tile } from "../world/Tile.js";
import { getRandomInt } from "../helpers/Helper.js";

export class Town{

    constructor(id,player){
        this.id = id;  
        this.initialize();
        this.name = null;
        this.location = {x: player.x,z: player.z}; 
        this.player = player;
        this.layout;
        this.generate();
        this.placePlayerinGate();
    }


    initialize(){
        var POI_chunk = document.getElementById("POI-chunk");
        POI_chunk.innerHTML = "";
        let visited = checkTownVisited(this.id);
        if(visited){
            this.readTownData(visited);
        }else{
            this.layout = this.generateNewTown(parseInt(this.id));
        }


        POI_chunk.style.height = (this.layout.length * 60 ) + "px";
        POI_chunk.style.width = (this.layout[0].length * 60 ) + "px";
        $('#POIModal').modal({backdrop: 'static', keyboard: false});  
        $("#POIModal").modal('show');
    }

    readTownData(visited){
        console.log(visited);
    }

    checkTownVisited(id){
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].id === id) {
              return towns[i];
            }
        }
        return false;
    }

    generateNewTown(seed){


        const array = [
            ["X","X","X","X","X","X","X","X","X","X","X"],
            ["X","D",15821,"D","W","D","D","D","D","D","X"],
            ["X","D","D","D","W","D","D","D","D","D","X"],
            ["X","D","D","D","W","W","D","D","D","D","X"],
            ["X","D","D","D","W","D","D","D","D","D","X"],
            ["X","G","D","D","W","D","D",10811,"D","D","X"],
            ["X","G","W","D","W","D","D","D","D","D","X"],
            ["X","W","W","D","D","D","D","D","D","D","X"],
            ["X","W","W","W","W","D","D","D","D","D","X"],
            ["X","D","W","D","W","W","W","W","W","W","W"],
            ["X","X","X","X","X","X","X","X","X","X","X"],
        ];

        return array;
    }

    generateRandomNumber(seed) {
        const x = Math.sin(seed) * 10000;
        return Math.floor((x - Math.floor(x)) * 90000) + 10000;
      }

    generate(){
        var b = document.getElementById('POI-chunk');

        for (var x = 0; x < this.layout.length; x++) {
            for (var z = 0; z < this.layout[x].length; z++) {
                var div = document.createElement('div');
                div.classList.add('tile');
                div.innerHTML = this.id+'/'+x+','+z;
                div.classList.add(this.getTileType(this.layout[x][z]));

                div.id = this.id+'/'+x+','+z;
                b.appendChild(div);   
            }
        }
    }

    getTileType(value){
        switch(value){
            case "A":
                return "dirt";
                break;

            case "B":
                return "wall";
                break;

            case "D":
                return "dirt";
                break;

            case "W":
                return "water";
                break;

            case 'G':
                return "gate";
                break;

            case 'X':
                return "exit";
                break;

            default:
                return 'manxe';
                break;
        }
    }

    placePlayerinGate(){
        //remove player from world
        console.log(this.player);
        $(".tile").removeClass("player");
        this.player.inPOI = this;
        var pos = this.findValueIn2DArray(this.layout,"G");     
        let tile = new Tile(this.id, pos.x, pos.z);
        console.log(this.id);
        tile.addClass('player');

        this.player.tile = new Tile(this.id, pos.x, pos.z);
    }

    placePlayer(){
        //remove player from world
        console.log(this.player);
        $(".tile").removeClass("player");
        let tile = new Tile(this.id, this.player.x, this.player.z);
        tile.addClass('player');

        this.player.tile = new Tile(this.id, this.player.x, this.player.z);
    }

    findValueIn2DArray(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === value) {
                console.log(i,j);
              return {x: i,z: j}; // value found
            }
          }
        }
      }
}
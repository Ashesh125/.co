import { Tile } from "../world/Tile.js";
import { getRandomInt,readFileContents } from "../helpers/Helper.js";
import { readFile } from "../helpers/Helper.js";

export class Town{

    constructor(id,player,coordinates){
        this.id = id;  
        this.name = null;
        this.location = {x: player.x,z: player.z}; 
        this.player = player;
        this.layout;
        this.coordinates = coordinates;
        this.from = null;
        this.to = null;
        this.initialize();
    }


    async initialize(){
        var POI_chunk = document.getElementById("POI-chunk");
        POI_chunk.innerHTML = "";
        let visited = this.checkTownVisited(this.id);
        if(visited){
            this.readTownData(visited);
        }else{
            this.layout = await this.generateNewTown(parseInt(this.id));
            this.name = await this.getNewTownName(this.id);
            this.addNewVisitedTown();
        }

        POI_chunk.style.height = (this.layout.length * 60 ) + "px";
        POI_chunk.style.width = (this.layout[0].length * 60 ) + "px";
        $('#POIModal').modal({backdrop: 'static', keyboard: false}); 
        $("#POIname").text(this.name); 
        $("#POIModal").modal('show');
        this.generate();
    }

    async getNewTownName(seed){
        // let rand = parseInt(Math.abs(seed).toString().slice(1, 3));
        let rand = getRandomInt(0,99);      
        let names = await readFileContents("../json/towns.json");
        
        return names[rand];
    }

    async generateNewTown(seed){
        // let rand = parseInt(Math.abs(seed).toString().charAt(0));        
        let rand = getRandomInt(0,7);  
        let layouts = await readFileContents("../json/town_layouts.json");

        return layouts[rand].layout;
    }

    readTownData(visited){
        console.log(visited);
    }

    checkTownVisited(id){
        let towns = JSON.parse(localStorage.getItem('towns'));
        if(towns.length > 0){
            for (let i = 0; i < towns.length; i++) {
                if (towns[i].id === id) {
                  this.layout = towns[i].layout;
                  this.name = towns[i].name;
                  this.coordinates = towns[i].coordinates;
                  return true;
                }
            }
        }
        
        return false;
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

        this.placePlayerinGate();
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

      addNewVisitedTown(){
        const existingTowns = JSON.parse(localStorage.getItem('towns'));
        const newTown = this.createTownObject();
        existingTowns.push(newTown);
        localStorage.setItem('towns', JSON.stringify(existingTowns));
      }

      createTownObject(){
         return {
            "id": this.id,
            "name": this.name,
            "coordinates": {
              "x": this.coordinates.x,
              "z": this.coordinates.z
            },
            "layout": this.layout,
            "from" : 0,
            "to": 0
         }   
      }
}
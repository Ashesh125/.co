import { Tile } from "../world/Tile.js";
import { getRandomInt, readFileContents, distanceFormula } from "../helpers/Helper.js";
import { readFile } from "../helpers/Helper.js";

export class Town {

    constructor(id, player, coordinates) {
        this.id = id;
        this.name = null;
        this.location = { x: player.x, z: player.z };
        this.player = player;
        this.layout;
        this.coordinates = coordinates;
        this.from = null;
        this.to = null;
        this.initialize();
        this.needsPath;
    }


    async initialize() {
        var POI_chunk = document.getElementById("POI-chunk");
        POI_chunk.innerHTML = "";
        let visited = this.checkTownVisited(this.id);

        if (visited) {
            this.needsPath = false;
            this.readTownData(visited);
        } else {
            this.needsPath = true;
            this.layout = await this.generateNewTown(parseInt(this.id));
            this.name = await this.getNewTownName(this.id);
            this.addNewVisitedTown();
        }

        console.log(this.needsPath,visited);
        POI_chunk.style.height = (this.layout.length * 60) + "px";
        POI_chunk.style.width = (this.layout[0].length * 60) + "px";
        $('#POIModal').modal({ backdrop: 'static', keyboard: false });
        $("#POIname").text(this.name);
        $("#POIModal").modal('show');
        this.generate();
    }

    async getNewTownName(seed) {
        // let rand = parseInt(Math.abs(seed).toString().slice(1, 3));
        let rand = getRandomInt(0, 99);
        let names = await readFileContents("../json/towns.json");

        return names[rand];
    }

    async generateNewTown(seed) {
        // let rand = parseInt(Math.abs(seed).toString().charAt(0));        
        let rand = getRandomInt(0,6);  
        let layouts = await readFileContents("../json/town_layouts.json");

        return layouts[rand].layout;
    }

    readTownData(visited) {
        console.log(visited);
    }

    checkTownVisited(id) {
        let towns = JSON.parse(localStorage.getItem('towns'));
        if (towns.length > 0) {
            for (let i = 0; i < towns.length; i++) {
                if (towns[i].id === id) {
                    this.layout = towns[i].layout;
                    this.name = towns[i].name;
                    this.coordinates = towns[i].coordinates;
                    this.from = towns[i].from;
                    this.to = towns[i].to;
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

    generate() {
        var b = document.getElementById('POI-chunk');
        let tileType = '';
        for (var x = 0; x < this.layout.length; x++) {
            for (var z = 0; z < this.layout[x].length; z++) {
                var div = document.createElement('div');
                div.classList.add('tile');
                tileType = this.getTileType(this.layout[x][z]);

                if(tileType == 'manxe'){
                    let idParts =  this.layout[x][z].match(/.{1,2}/g);
                    let special = idParts[3].split('');
                    switch(special[0]){
                        case "1":
                            div.classList.add("merchant");
                            break;

                        case "2":    
                            div.classList.add("healer");
                            break;

                        case "3":
                            div.classList.add("guild");
                            break;
                    }
                    div.setAttribute('data-number', this.layout[x][z]);
                }
                div.id = this.id + '/' + x + ',' + z;
                
                // div.innerHTML = this.id+'/'+x+','+z;
                div.classList.add(tileType);
                b.appendChild(div);
            }
        }

        this.placePlayerinGate();
    }

    getTileType(value) {
        switch (value) {
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
                return "grass";
                break;

            case 'X':
                return "exit";
                break;

            case "P":
                return "waypoint";
                break;

            case "S":
                return "gate";
                break;    

            default:
                return 'manxe';
                break;
        }
    }

    placePlayerinGate(){
        $(".tile").removeClass("player");
        this.player.inPOI = this;
        var pos = this.findValueIn2DArray(this.layout, "S");
        let tile = new Tile(this.id, pos.x, pos.z);
        tile.addClass('player');
        this.player.tile = new Tile(this.id, pos.x, pos.z);
    }

    placePlayer() {
        //remove player from world
        $(".tile").removeClass("player");
        let tile = new Tile(this.id, this.player.x, this.player.z);
        tile.addClass('player');

        this.player.tile = new Tile(this.id, this.player.x, this.player.z);
    }

    findValueIn2DArray(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === value) {
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
        this.onEnterTown(existingTowns);
    }

    onEnterTown(existingTowns) {
        const calculateDistance = (x1, z1, x2, z2) => {
            // Distance formula: sqrt((x2 - x1)^2 + (z2 - z1)^2)
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((z2 - z1), 2));
        };

        existingTowns.forEach((town, currentIndex) => {
            let previousMinDistance = Infinity;
            let previousMinId = null;
            let nextData = null;
            let nextMinDistance = Infinity;
            let nextMinId = null;

            if (currentIndex > 0 && currentIndex < existingTowns.length) {
                // previousData = existingTowns[currentIndex - 1]; // Data of the previous index

                // Calculate distances between the current town and all the towns with indices less than the current index
                for (let i = 0; i < currentIndex; i++) {
                    const townI = existingTowns[i];
                    const distance = calculateDistance(
                        townI.coordinates.x * 10 + townI.position.x,
                        townI.coordinates.z * 10 + townI.position.z,
                        town.coordinates.x * 10 + town.position.x,
                        town.coordinates.z * 10 + town.position.z
                    );
                    if (distance < previousMinDistance) {
                        previousMinDistance = distance;
                        this.from = townI.id;
                    }
                }
            }
            // Calculate distances between the current town and all the towns with indices greater than the current index
            if (currentIndex >= 0 && currentIndex < existingTowns.length - 1) {
                for (let i = currentIndex + 1; i < existingTowns.length; i++) {
                    const townI = existingTowns[i];
                    const distance = calculateDistance(
                        townI.coordinates.x * 10 + townI.position.x,
                        townI.coordinates.z * 10 + townI.position.z,
                        town.coordinates.x * 10 + town.position.x,
                        town.coordinates.z * 10 + town.position.z
                    );
                    if (distance < nextMinDistance) {
                        nextMinDistance = distance;
                        nextMinId = townI.id;
                    }

                }
            }

            
            town.from = parseInt(this.from);
            town.to = parseInt(nextMinId);  
        });
        localStorage.setItem('towns', JSON.stringify(existingTowns));
    }

    createTownObject() {
        return {
            "id": this.id,
            "name": this.name,
            "coordinates": {
                "x": parseInt(this.coordinates.x),
                "z": parseInt(this.coordinates.z)
            },
            "layout": this.layout,
            "from": 0,
            "to": 0,
            "position": this.location
        }
    }

    getNearestTown(){
        let nearestTown;
        const towns = JSON.parse(localStorage.getItem('towns'));
        let lowestGoldCost = Infinity; 

        towns.forEach(town => {
            if(this.id !== town.id){
                const gold_cost = Math.ceil(distanceFormula(town.coordinates, this.coordinates) / 2);
                if (gold_cost < lowestGoldCost) {
                    lowestGoldCost = gold_cost;
                    nearestTown = town;
                }
            }
        });

        return nearestTown;
    }

}
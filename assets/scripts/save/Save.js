import { findObjectById,replaceObjectById,getCurrentDate,getCurrentDateTime } from "../helpers/Helper.js";

export class Save{

    constructor(game){
        this.game = game;
        if(localStorage.getItem('saves') == null){
            this.saves = [];
            this.save = this.initialSave();
            this.saves.push(this.save);
            localStorage.setItem('towns',JSON.stringify([]));
            localStorage.setItem('saves', JSON.stringify(this.saves));
            
        }else{
            this.saves = JSON.parse(localStorage.getItem('saves'));
            this.save = findObjectById(this.saves,this.game.id);
            if(this.save == undefined){
                this.firstSave();
                localStorage.setItem('towns',JSON.stringify([]));
            }else{
                localStorage.setItem('towns',JSON.stringify(this.save.towns));
            } 
        }

    }

    initialSave(){
        return {
            "id": this.game.id,
            "name": this.game.name,
            "gold": 100,
            "party_members": 3,
          
            "world": {
                "seed": this.game.seed,
                "player": {
                  "position": {
                    "x": 50000,
                    "z": 50000
                  },
                  "tile":{
                      "x": 5,
                      "z": 5
                  }
                }
            },
            "dates" :{
                "created_at": getCurrentDate(),
                "last_save": null,
                "play_time": null
            },
            "characters": [],
            "dead_characters":[],
            "towns": [],
        }
    }
    
    firstSave(){
        const existingSaves = JSON.parse(localStorage.getItem('saves'));
        const newSave = this.initialSave();
        existingSaves.push(newSave);
        localStorage.setItem('saves', JSON.stringify(existingSaves));
    }

    newSave(world){
        return {
            "id": this.game.id,
            "name": this.game.name,
            "gold": this.game.gold,
            "party_members": this.game.party,
          
            "world": {
                "seed": this.game.seed,
                "player": {
                  "position": world.coordinates,
                  "tile":{
                      "x":world.player.x,
                      "z":world.player.z
                  }
                }
            },
            "dates" :{
                "created_at": this.save.dates.created_at,
                "last_save": getCurrentDateTime(),
                "play_time": "time"
            },
            "characters": [],
            "dead_characters":[],
            "towns": JSON.parse(localStorage.getItem('towns')),
        }
    }

    saveGame(world){
        let newSave = this.newSave(world);
        this.saves = replaceObjectById(this.saves,newSave);
        localStorage.setItem('saves',JSON.stringify(this.saves));
    }

    
    getSave(){
        return this.save;
    }
}
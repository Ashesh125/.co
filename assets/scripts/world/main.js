import NoiseGenerator from './NoiseGenerator.js';
import {World} from './World.js';
import { readFileContents } from '../helpers/Helper.js';
import { CONSTANTS } from '../constants/Constant.js';

$(document).ready(function(){
    const seed =58465;  
    // const seed = 999999999999999;
    var counter = 1;
    let CHUNK_SIZE = 10; 

    let loadSave = true;

    if(loadSave){
      
      let save = JSON.parse(localStorage.getItem('save'));
      if (!localStorage.getItem('towns')) {
        localStorage.setItem('towns', JSON.stringify([]));
      }
      const noiseGenerator = new NoiseGenerator(save.world.seed);
      const world = new World(noiseGenerator);
      world.loadSaveState(save);
      // world.loadChunks();
  
      // world.placePlayer();


      $(document).keydown(function (event) {
        // console.log("key:"+event.key);
        world.action(event.key);
      });
    }else{
      let temp = {
        "name": "example",
        "gold": 100,
        "party_members": 3,
      
        "world": {
          "seed": 58465,
          "player": {
            "position":{
                "x": 50000,
                "z": 50000
            },
            "tile":{
                "x":5,
                "y":5
            }
          }
        },
    
        "dates" :{
            "created_at": "date",
            "last_save": "date",
            "play_time": "time"
        }
    
    };
    console.log(temp);
      temp = JSON.stringify(temp);
      localStorage.setItem('save',temp);  
    }
  
  
      // async function accessSaveFile() {
      //   try {
      //     const save = await readFileContents("../../saves/example/game.json");
      //     console.log("await",save);
      //     return save; // Access the contents of the save file here
      //   } catch (error) {
      //     console.error('Error accessing save file:', error);
      //   }
      // }

      $('#save-button').on('click',function(){
        alert("Asd");
      });
 });

 
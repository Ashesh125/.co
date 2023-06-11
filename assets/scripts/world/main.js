import NoiseGenerator from './NoiseGenerator.js';
import {World} from './World.js';
import {Helper} from '../helpers/Helper.js';

$(document).ready(function(){
    const seed =42131557 ;
    var counter = 1;
    let CHUNK_SIZE = 10; 
    const noiseGenerator = new NoiseGenerator(seed);
    const world = new World(noiseGenerator);
    world.loadChunks();

    world.placePlayer();

    $(document).keydown(function(event) {
        // console.log("key:"+event.key);
        world.action(event.key);
      });
 });
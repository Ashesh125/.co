import NoiseGenerator from './NoiseGenerator.js';
import {World} from './World.js';
import {Player} from '../entities/Player.js';
import {Helper} from '../helpers/Helper.js';

$(document).ready(function(){
    
    var counter = 0;
    let CHUNK_SIZE = 10; 
    const noiseGenerator = new NoiseGenerator(1221);
    const world = new World(noiseGenerator);
    world.loadChunks();

    var player = new Player();
    world.placePlayer(player);

 });
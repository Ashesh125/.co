import NoiseGenerator from './NoiseGenerator.js';
import { World } from './World.js';
import { popUp } from '../helpers/Helper.js';
import { CONSTANTS } from '../constants/Constant.js';
import { Save } from "../save/Save.js";

$(document).ready(function() {
    // const game = {
    //   "id" : 2,
    //   "name": "Test Save 2",
    //   "gold": 1000,
    //   "party_members": 5,
    //   "seed": 514105
    // };
    // const game = {
    //     "id" : 1,
    //     "name": "Test Save",
    //     "gold": 1000,
    //     "party_members": 5,
    //     "seed": 11223
    //   };
    const game = JSON.parse(localStorage.getItem('gameState'));
    console.log(game);

    let loadSave = true;

    if (loadSave) {
        $("#title-main").text(game.name + ".co");
        var saveObj = new Save(game);
        let save = saveObj.getSave();

        const noiseGenerator = new NoiseGenerator(save.world.seed);
        const world = new World(noiseGenerator);
        world.loadSaveState(save);

        $(document).keydown(function(event) {
            // console.log("key:"+event.key);
            world.action(event.key);
        });

        $('.save-button').on('click', function() {
            saveObj.saveGame(world);
            popUp("Game has been Saved");
        });

        $('.save-quit-button').on('click', function() {
            saveObj.saveGame(world);
            popUp("Game has been Saved");
            window.close();
        });

        $('.quit-button').on('click', function() {
            $("#confirmModal").modal('toggle');
        });

        $(".exit-button").on('click', function() {
            window.close();
        });
    } else {

    }




});
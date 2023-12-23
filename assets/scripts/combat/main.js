import { Combat } from "./Combat.js";
import { Audio } from "../sound/Audio.js";

import {World} from "../world/World.js";
import {Save} from "../save/Save.js";
import { TerrainGenerator } from "../world/TerrainGenerator.js";
import NoiseGenerator from "../world/NoiseGenerator.js";

$(document).ready(function(){

    const audio = new Audio();
    audio.play('combat');

    const combat = new Combat();

    $("#attack").on("click",function(){
        combat.attack();
    });

    $('#enemy-dropdown').on("click", ".attackEnemy", function(event) {
        $(".actions").hide();
        combat.attack($(this).attr('data-attribute'));
    });

    $('#end').on("click",function(){
        combat.endTurn();
    });

});
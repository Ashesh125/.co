import { Combat } from "./Combat.js";
import { Audio } from "../sound/Audio.js";

$(document).ready(function(){

    const audio = new Audio();
    audio.play('combat');

    const combat = new Combat();

    $("#attack").on("click",function(){
        combat.attack();
    });
});
import { Character } from "./Character.js";

$(document).ready(function() {
    const character = new Character();
    $('[data-toggle="tooltip"]').tooltip();

    $("#party-name-btn").click(() => {

        character.addcharacterData();
    });
    $('.random-stats').on("click", function() {
        var id = $(this).attr("id").split("-")[1];


        const newChar = character.newCharacter();
        newChar.then((result) => {
            character.assignCharacter(id, result);
        });
    });
});
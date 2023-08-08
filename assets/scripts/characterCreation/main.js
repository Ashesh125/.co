import { Character } from "./Character.js";

$(document).ready(function() {
    const character = new Character();
    character.loadStarters();
    let selectedClasses = ['Warrior', 'Warrior', 'Warrior'];
    $('[data-toggle="tooltip"]').tooltip();

    $("#party-name-btn").on("click", () => {
        character.saveCharacterData();
    });


    $(".class-name").on("change", function() {
        let id = $(this).attr("id").split("-")[2];
        selectedClasses[id] = $(this).find(":selected").text();
        const newChar = character.loadOne(id, selectedClasses[id]);
    });

    $('.random-stats').on("click", function() {
        var id = $(this).attr("id").split("-")[1];
        const newChar = character.loadOne(id, selectedClasses[id]);
    });
});
import { CharacterData } from "./CharacterData.js";

$(document).ready(function() {
    const characterdata = new CharacterData();

    // addGender();
    // addclassGroup();
    // getCharacterData("characters");
    $('[data-toggle="tooltip"]').tooltip();

    $("#party-name-btn").click(() => {

        characterdata.addcharacterData();
    });
});
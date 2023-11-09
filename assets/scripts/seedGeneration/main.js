import { getRandomInt } from "../helpers/Helper.js";
import { Save } from "../save/Save.js";
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";

$(document).ready(function() {

    $('#seed-input-btn').click(() => {

        var seed = $("#seed-input").val();
        if (seed.length == 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Assign a Seed or choose the Random seed option!!!',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } else {
            newGame(seed);
        }
    });

    $("#random-seed-btn").on("click",() => {
        const seed = getRandomInt(1,9999999999999);
        newGame(seed);
    });

    function newGame(seed){
        const game = {
            "id" : getRandomInt(100000,99999999999),
            "name": localStorage.getItem("party"),
            "gold": 100,
            "party_members": 3,
            "seed": seed
        };
        localStorage.setItem('gameState',JSON.stringify(game));
        var save = new Save(game);

        location.href = "nameRegistration.html";
    }
});
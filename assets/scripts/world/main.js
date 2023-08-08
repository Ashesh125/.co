import NoiseGenerator from './NoiseGenerator.js';
import { World } from './World.js';
import { popUp } from '../helpers/Helper.js';
import { CONSTANTS } from '../constants/Constant.js';
import { Save } from "../save/Save.js";
import { Commands } from '../Commands/Commands.js';


$(document).ready(function() {
    $('#profile-body').addClass("d-none");
    //   };
    $("#toggle-btn").on('click', function() {
        if ($("#profile-body").hasClass("d-none")) {
            $("#inventory-body").addClass("d-none");
            $('#profile-body').removeClass("d-none");
            // $("#toggle-btn").text("Inventory");
        } else {
            $("#inventory-body").removeClass("d-none");
            $("#profile-body").addClass("d-none");
            // $("#toggle-btn").text("Profile");
        }
        $(this).text($("#inventory-body").is(":visible") ? "Profile" : "Inventory");
    });
    // const game = {
    //     "id": 2,
    //     "name": "Test Save 2",
    //     "gold": 1000,
    //     "party_members": 5,
    //     "seed": 514105
    // };
    // const game = {
    //     "id": 1,
    //     "name": "Test Save",
    //     "gold": 1000,
    //     "party_members": 5,
    //     "seed": 11223
    //   };
    const game = JSON.parse(localStorage.getItem('gameState'));

    let loadSave = true;
    console.log(game);
    if (loadSave) {
        $("#title-main").text(game.name + ".co");
        var saveObj = new Save(game);
        let save = saveObj.getSave();

        const noiseGenerator = new NoiseGenerator(save.world.seed);
        const world = new World(noiseGenerator);
        world.loadSaveState(save);
        $("#gold").val(world.player.gold);
        const command = new Commands(world,saveObj);
        $(document).keydown(function(event) {
            world.action(event.key);

        });

        $('.save-button').on('click', function() {
            saveObj.saveGame(world);
            popUp("Game has been Saved");
        });

        $('.save-quit-button').on('click', function() {
            saveObj.saveGame(world);
            popUp("Game has been Saved");
            window.location.href = "./mainpage.html";
        });

        $('.quit-button').on('click', function() {
            $("#confirmModal").modal('toggle');
        });

        $(".exit-button").on('click', function() {
            window.location.href = "./mainpage.html";
        });

        $(".towns-list").on("click", ".teleport-btn", function(event) {
            let id = $(this).attr('id').split("-");
            let towns = JSON.parse(localStorage.getItem("towns"));
            let foundTown = towns.find((town) => town.id === id[1]);
            
            if(world.player.gold > parseInt(id[2]) ){
                world.player.gold -= parseInt(id[2]);
                if (foundTown) {
                    world.coordinates.x = foundTown.coordinates.x;
                    world.coordinates.z = foundTown.coordinates.z;
        
                    world.player.x = foundTown.position.x;
                    world.player.z = foundTown.position.z;
                } 
                console.log(world);
                saveObj.saveGame(world);
                window.location.reload();            
            }else{
                alert("Not enough Gold!!!!!");
            }
        });
    } else {

    }
    // $('.player').append(
    //   "<img width='60px' height='60px' src='../images/skull.png'>"
    // );
    $("#menu-icon-settings").on('click', function() {
        $('#menuModal').modal('toggle');
    });

 


    $(document).on('ended', 'audio', function() {
        this.currentTime = 0;
        this.world.audio.play();
    });
});
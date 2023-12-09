import NoiseGenerator from './NoiseGenerator.js';
import { World } from './World.js';
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";
import { CONSTANTS } from '../constants/Constant.js';
import { Save } from "../save/Save.js";
import { Commands } from '../Commands/Commands.js';

$(document).ready(function() {
    $('#profile-body').addClass("d-none");
    $('#town-body').addClass("d-none");


    // Add click event handlers using jQuery
    $('#inventory-btn').on('click', function() {
        $('#inventory-body').removeClass("d-none");
        $('#profile-body, #town-body').addClass("d-none");
    });

    $('#profile-btn').on('click', function() {
        $('#profile-body').removeClass("d-none");
        $('#inventory-body, #town-body').addClass("d-none");
    });

    $('#town-btn').on('click', function() {
        $('#town-body').removeClass("d-none");
        $('#inventory-body, #profile-body').addClass("d-none");
    });

    //   };
    // $("#toggle-btn").on('click', function() {
    //     if ($("#profile-body").hasClass("d-none")) {
    //         $("#inventory-body").addClass("d-none");
    //         $('#profile-body').removeClass("d-none");
    //         // $("#toggle-btn").text("Inventory");
    //     } else {
    //         $("#inventory-body").removeClass("d-none");
    //         $("#profile-body").addClass("d-none");
    //         // $("#toggle-btn").text("Profile");
    //     }
    //     $(this).text($("#inventory-body").is(":visible") ? "Profile" : "Inventory");
    // });
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
    if (loadSave) {
        $("#title-main").text(game.name + ".co");
        $(".use-item-btn").hide();


        var saveObj = new Save(game);
        let save = saveObj.getSave(); 
        const noiseGenerator = new NoiseGenerator(save.world.seed);
        const world = new World(noiseGenerator);
        world.loadSaveState(save);
        console.log(world);
        $("#gold").val(world.player.gold);
        const command = new Commands(world, saveObj);
        $(document).keydown(function(event) {
            world.action(event.key);

        });

        $('.save-button').on('click', function() {
            saveObj.saveGame(world);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Game has been Saved',
                showConfirmButton: false,
                timer: 1500
            });
        });

        $('.save-quit-button').on('click', function() {
            saveObj.saveGame(world);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Game has been Saved',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(function() {
                window.location.href = "./mainpage.html";
            }, 1500);
        });

        $('.quit-button').on('click', function() {
            Swal.fire({
                title: 'Exit without Saving ???',
                showCancelButton: true,
                confirmButtonText: 'Exit',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.href = "./mainpage.html";
                }
            })
        });

        $(".towns-list").on("click", ".teleport-btn", function(event) {
            let id = $(this).attr('id').split("-");
            let towns = JSON.parse(localStorage.getItem("towns"));
            let foundTown = towns.find((town) => town.id === id[1]);

            if (world.player.gold > parseInt(id[2])) {
                world.player.gold -= parseInt(id[2]);
                if (foundTown) {
                    world.coordinates.x = foundTown.coordinates.x;
                    world.coordinates.z = foundTown.coordinates.z;

                    world.player.x = foundTown.position.x;
                    world.player.z = foundTown.position.z;
                }
                saveObj.saveGame(world);
                window.location.reload();
            } else {
                Swal.fire('Not enough Gold!!!');
            }
        });


        $('#inventory-button').on("click", function() {
            world.action("I");
        });

        $("#buy-from-merchant").on("click", function() {
            world.buy($('#selling-item-price').val());
            saveObj.saveGame(world);
        });

        $("#sell-to-guild").on("click", function() {
            world.sell($('#buying-item-price').val());
            saveObj.saveGame(world);
        });

        $("#heal-btn").on("click", function() {
            world.healAll(15);
            saveObj.saveGame(world);
        });

        $('.inventory-left-holder').on('click', '.item-sprite', (event) => {
            const id = $(event.currentTarget).attr('id');
            const clickedElement = world.item.inventory.find(element => element.id == id);

            if (clickedElement) {
                $(".inventory-right-holder").empty(); // Clear the contents before appending

                let block = `<div id="inventory-detail" class="d-flex">
                <div class="inventory-info aligns-items-center justify-content-center mb-2">
                    <img src="${clickedElement.sprite}" class="item-sprite" id="${clickedElement.id}">
                </div>
                <div id="inventory-form mt-5">
                    <div class="input-group input-group-md m-3">
                        <input type="text" class="form-control character-data h-100" id="item-name" value="${clickedElement.name}" readonly>
                    </div>

                </div>
                
                </div>
                <table class="table border-1 table-sm" style="font-size:13px; padding:0px;">
                    <thead>
                        <tr>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody  class="table-group-divider">
                        <tr>
                        <td>${clickedElement.quantity}</td>
                        <td>${clickedElement.price}</td>
                        </tr>
                        <tr>
                        
                    </tbody>
                </table>
                <div class="description">${clickedElement.description}</div>`;

                if (clickedElement.consumable && clickedElement.type !== 'heal') {
                    block += `<button id='toggle-btn' class='p-2 mx-2 consume-btn' data-attribute='${clickedElement.id}'>Use</button>`;
                    $(".use-item-btn").hide();
                } else if (clickedElement.consumable && clickedElement.type === 'heal') {
                    $(".use-item-btn").data("item-id", clickedElement.id);
                    $(".use-item-btn").show();
                }


                $(".inventory-right-holder").append(block);
            }

            $(".inventory-right-holder").one("click", ".consume-btn", function() {
                const dataAttribute = $(this).data("attribute");
                world.item.useWorldConsumable(dataAttribute, world);

                switch (dataAttribute) {
                    case 6:
                        saveObj.saveGame(world);
                        window.location.reload();
                }
            });

            $('ul.dropdown-menu').on('click', 'li', function(event) {
                event.stopPropagation();
                const itemId = $(".use-item-btn").data("item-id");
                const characterId = $(this).data("character-id");

                world.item.useCharacterConsumable(itemId, characterId);
            });
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
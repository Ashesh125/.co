import { Load } from "../load/Load.js";
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";

$(document).ready(function() {
    const load = new Load();

    $('#continue-button').on("click", () => {
        $("#continueModal").modal('toggle');
    });

    $('#setting-button').on("click", () => {
        $("#settingModal").modal('toggle');
    });

    $(".delete-save").on("click", (event) => {
        Swal.fire({
            title: 'Do you want to delete the Save?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const id = $(event.currentTarget).attr("id").split('-');
                var saves = JSON.parse(localStorage.getItem('saves'));
                const updatedSaves = saves.filter(save => parseInt(save.id) !== parseInt(id[2]));
                localStorage.setItem('saves', JSON.stringify(updatedSaves));
                $("#load-body-" + id[2]).addClass('d-none');
                Swal.fire('Deleted!', '', 'success')
            }
          });
    });

    $(".load-save").on("click", (event) => {
        const id = $(event.currentTarget).attr("id").split('-');
        localStorage.setItem('gameState', JSON.stringify(load.getGameObject(id[2])));
        window.location.href = "./world.html";
    });

    $("#exit-button").on("click", () => {
        window.close();
    });
    $("#import-button").click(function() {
        // Trigger the hidden file input element
        $("#fileInput").trigger("click");
    });
    $("#fileInput").change(function(event) {
        load.importJSON(event);
    });
    $("#export-button").click(function() {
        load.exportJSON();
    });
});
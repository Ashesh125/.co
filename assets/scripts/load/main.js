import { Load } from "../load/Load.js";

$(document).ready(function(){
    const load = new Load();

    $('#continue-button').on("click",() => {
         $("#continueModal").modal('toggle');
    });

    $('#setting-button').on("click",() => {
      $("#settingModal").modal('toggle');
    });

    $(".delete-save").on("click", (event) => {
      if(confirm("Sure Delete Save???")){
        const id = $(event.currentTarget).attr("id").split('-');
        var saves = JSON.parse(localStorage.getItem('saves'));
        const updatedSaves = saves.filter(save => parseInt(save.id) !== parseInt(id[2]));
        localStorage.setItem('saves', JSON.stringify(updatedSaves)); 
        $("#load-body-"+id[2]).addClass('d-none');
      }
    });

    $(".load-save").on("click", (event) => {
        const id = $(event.currentTarget).attr("id").split('-');
        localStorage.setItem('gameState',JSON.stringify(load.getGameObject(id[2])));
        window.location.href = "./world.html";
      });

      $("#exit-button").on("click",() => {
        window.close();
      });
});
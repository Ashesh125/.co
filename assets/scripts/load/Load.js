import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";

export class Load {

    constructor() {
        this.loadedSaves = false;
        this.saves = this.getAll() || [];
        this.showSaves();
    }


    getAll() {
        if (localStorage.getItem("saves")) {
            return JSON.parse(localStorage.getItem("saves"));
        }
    }

    showSaves() {
        if (!this.loadedSaves) {
            this.saves.forEach(e => {
                var block = '<div class="load-body m-2 p-2 d-flex flex-wrap" id="load-body-' + e.id + '"><div class="col-5 fs-10 id-holder">(' + e.id + ')</div>' +
                    '<div class="col-7 text-end fs-10 created-holder">Created At: ' + e.dates.created_at + '</div>' +
                    '<div class="col-12 fs-4 name-holder">' + e.name + '</div>' +
                    '<div class="col-5 fs-6 seed-holder">seed :' + e.world.seed + '</div>' +
                    '<div class="col-7"></div>' +
                    '<div class="col-4 gold-holder">' +
                    '<div><img src="../sprites/Golden Coin.png"><span class="col-5 fs-6"> ' + e.gold + '</span></div>' +
                    '</div>' +
                    '<div class="col-4 players-holder">' +
                    '<div><img src="../sprites/Helm.png"><span class="col-5 fs-6"> 3</span></div>' +
                    '</div><div class="col-4"></div>' +
                    '<div class="col-1 load-save" id="load-save-' + e.id + '"><span class="border border-primary p-1">Load</span></div>' +
                    '<div class="col-1 delete-save" id="delete-save-' + e.id + '"><span class="border border-danger p-1">Delete</span></div>' +
                    '<div class="col-10 text-end fs-10 last-save-holder">Last Save: ' + e.dates.last_save + '</div></div>';

                $(".load-block").append(block);

            });
            this.loadedSaves = true;
        }
    }

    getGameObject(id) {
        let save = this.saves.find(save => save.id == id);
        return {
            "id": save.id,
            "name": save.name,
            "gold": save.gold,
            "party_members": save.party_members,
            "seed": save.world.seed
        };
    }
    
    importJSON(event) {
        var fileInput = event.target;
    
        // Check if a file was selected
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var reader = new FileReader();
    
            reader.onload = function(event) {
                var importedData = event.target.result;
                var jsonData = JSON.parse(JSON.parse(importedData));
    
                // Retrieve existing data from local storage
                var existingData = localStorage.getItem("saves");
                var existingArray = existingData ? JSON.parse(existingData) : [];

                // Append each object from importedData's array to existingArray
                // if (Array.isArray(jsonData)) {
                    jsonData.forEach(function(item) {
                        existingArray.push(item);
                    });
                // }
    
                localStorage.setItem("saves", JSON.stringify(existingArray));

            };
    
            reader.readAsText(file);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Imported Successfully',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(function() {
                window.location.reload();
              }, 1500);
        }
    }
    exportJSON() {
        var jsonData = localStorage.getItem("saves");
        var jsonString = JSON.stringify(jsonData);

        // Create a Blob with the JSON data
        var blob = new Blob([jsonString], {
            type: "application/json"
        });

        // Create a temporary anchor element
        var downloadLink = $("<a></a>")
            .attr("href", URL.createObjectURL(blob))
            .attr("download", "saves.json");

        // Append the anchor to the document and click it programmatically
        $("body").append(downloadLink);
        downloadLink[0].click();

        // Clean up
        downloadLink.remove();
    }
}
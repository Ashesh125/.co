export class CharacterData {
    constructor() {
        this.addGender();
        this.addclassGroup();
    }
    addGender() {
        const genderdata = ["male", "female"];
        var selects = document.getElementsByClassName('gender');
        for (var j = 0; j < selects.length; j++) {
            var select = selects[j];
            for (var i = 0; i < genderdata.length; i++) {
                var optn = genderdata[i];
                var el = document.createElement("option");
                el.textContent = optn;
                el.value = ("0" + i).slice(-2);;
                select.appendChild(el);
            }
        }
    }

    addclassGroup() {
        const classGroup = ["smthg", "smthg"];
        var selects = document.getElementsByClassName('class-name');
        for (var j = 0; j < selects.length; j++) {
            var select = selects[j];
            for (var i = 0; i < classGroup.length; i++) {
                var optn = classGroup[i];
                var el = document.createElement("option");
                el.textContent = optn;
                el.value = optn;
                select.appendChild(el);
            }
        }
    }

    addToLocalStorage(dataKey, newData) {
        // Retrieve existing data from localStorage
        var existingData = localStorage.getItem(dataKey);
        var updatedData;

        if (existingData) {
            // If data exists, parse it from a string to an object
            updatedData = JSON.parse(existingData);

            // Update the data with the new data
            updatedData.push(newData);
        } else {
            // If no existing data, create a new array with the new data
            updatedData = [newData];
        }

        // Store the updated data back in localStorage
        localStorage.setItem(dataKey, JSON.stringify(updatedData));

        console.log(updatedData);
        var blob = new Blob([updatedData], { type: "application/json" });

        // Save the file using FileSaver.js
        saveAs(blob, "data.json");
    }

    addcharacterData() {
        var userdata = [];
        var party_name = $('#party-name-input').val();
        for (var i = 0; i < 3; i++) {
            var username = $('#username-' + i).val();
            var gender = $('#gender-' + i).val();
            var classGroup = $('#class-name-' + i).val();

            userdata[i] = {
                "name": username,
                "gender": gender,
                "class": classGroup,

            };
        }
        this.addToLocalStorage("characters", userdata);

    }

}
import { getRandomInt, generateRandomStat, readFileContents } from "../helpers/Helper.js";

export class Character {
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

        var newupdateddata = JSON.stringify(updatedData);

        var blob = new Blob([newupdateddata], { type: "application/json" });

        // Save the file using FileSaver.js
        saveAs(blob, "data.json");;
    }
    addPartyToLocalStorage(dataKey, newData) {
        var existingData = localStorage.getItem(dataKey);
        var updatedData;

        if (existingData) {
            updatedData = JSON.parse(existingData);
            updatedData.push(newData);
        } else {
            updatedData = [newData];
        }
        localStorage.setItem(dataKey, JSON.stringify(updatedData));

        var newupdateddata = JSON.stringify(updatedData);

        var blob = new Blob([newupdateddata], { type: "application/json" });

        // Save the file using FileSaver.js
        saveAs(blob, "patyinfo.json");;
    }

    addcharacterData() {
        var userdata = [];
        var party = $('#party-name-input').val();
        for (var i = 0; i < 3; i++) {
            var username = $('#username-' + i).val();
            var gender = $('#gender-' + i).val();
            var classGroup = $('#class-name-' + i).val();
            var attack = $('#attack-stat-' + i).text();
            var crit = $('#crit-stat-' + i).text();
            var defence = $('#defence-stat-' + i).text();
            var health = $('#health-stat-' + i).text();
            var agility = $('#agility-stat-' + i).text();
            var speed = $('#speed-stat-' + i).text();
            var luck = $('#luck-stat-' + +i).text();

            userdata[i] = {
                "name": username,
                "gender": gender,
                "class": classGroup,
                "stats": {
                    "attack": attack,
                    "crit": crit,
                    "defence": defence,
                    "health": health,
                    "agility": agility,
                    "speed": speed,
                    "luck": luck
                }

            };
        }
        this.addToLocalStorage("characters", userdata);
        this.addPartyToLocalStorage("parties", party);

    }

    async newCharacter() {
        const first_name = await this.getFirstName(123);
        const last_name = await this.getLastName(123);
        var character = {
            "name": first_name + " " + last_name,
            "stats": {
                "attack": this.calculateStat("attack", 5, 10),
                "crit": this.calculateStat("crit", 5, 10),
                "defence": this.calculateStat("defence", 5, 10),
                "health": this.calculateStat("health", 5, 10),
                "agility": this.calculateStat("agility", 5, 10),
                "speed": this.calculateStat("speed", 5, 10),
                "luck": this.calculateStat("luck", 5, 10)
            }
        }

        return character;
    }

    assignCharacter(id, character) {
        $('#username-' + id).val(character.name);
        $('#attack-stat-' + id).text(character.stats.attack);
        $('#crit-stat-' + id).text(character.stats.attack);
        $('#defence-stat-' + id).text(character.stats.attack);
        $('#health-stat-' + id).text(character.stats.attack);
        $('#agility-stat-' + id).text(character.stats.attack);
        $('#speed-stat-' + id).text(character.stats.attack);
        $('#luck-stat-' + id).text(character.stats.attack);
    }

    async getFirstName(seed) {
        // let rand = parseInt(Math.abs(seed).toString().slice(1, 3));
        let rand = getRandomInt(0, 99);
        let names = await readFileContents("../json/male_names.json");

        return names[rand];
    }

    async getLastName(seed) {
        // let rand = parseInt(Math.abs(seed).toString().slice(1, 3));
        let rand = getRandomInt(0, 99);
        let names = await readFileContents("../json/last_names.json");

        return names[rand];
    }
    calculateStat(type, min, max) {
        switch (type) {
            case "attack":
            case "crit":
            case "defence":
            case "health":
            case "agility":
            case "speed":
            case "luck":
                return generateRandomStat(min, max);
            default:
                throw new Error("Invalid type of stat");
        }
    }
}
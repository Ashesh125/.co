import { getRandomInt, getRandomStat, readFileContents, generateRandomNumber01 } from "../helpers/Helper.js";

export class Character {
    constructor() {
        const classesList = this.getCharacterClasses();
        this.classes = classesList;
        classesList.then((classes) => {
            this.addGender();
            this.addclassGroup(classes);
        });
        this.characterArr = [];
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

    addclassGroup(classes) {
        var selects = document.getElementsByClassName('class-name');
        for (var j = 0; j < selects.length; j++) {
            var select = selects[j];
            for (var i = 0; i < classes.length; i++) {
                var optn = classes[i].name;
                var el = document.createElement("option");
                el.textContent = optn;
                el.value = optn;
                select.appendChild(el);
            }
        }
    }

    loadStarters() {
        let count = 3;
        let types = [];

        this.classes.then((classes) => {
            for (let i = 0; i < count; i++) {
                types[i] = classes[getRandomInt(0, classes.length - 1)];
                $("#class-name-" + i).val(types[i].name);
                let newChar = this.newCharacter(types[i]);
                newChar.then((data) => {
                    this.characterArr[i] = data;
                    this.assignCharacter(i, data);
                });

            }
        });
    }

    loadOne(id, type) {
        this.classes.then((classes) => {
            type = classes.filter(item => item.name === type);
            let newChar = this.newCharacter(type[0]);
            newChar.then((data) => {
                this.characterArr[id] = data;
                this.assignCharacter(id, data);
            });
        });
    }

    saveCharacterData(name) {
        localStorage.setItem("characters", JSON.stringify(this.characterArr));
        localStorage.setItem("party", name);
        location.href = "./seedGeneration.html";
    }

    async newCharacter(type) {
        const first_name = await this.getFirstName(13);
        const last_name = await this.getLastName(13);
        const saying = await this.getSaying(13);
        let health = this.calculateStat("health", type);
        var character = {
            'id': getRandomInt(1, 9999999),
            "name": first_name + " " + last_name,
            "gender": "male",
            "sprite": "asd",
            "class": type.name,
            "saying": saying,
            "trait": getRandomInt(0, 2),
            "status": "active",
            "stats": {
                "attack": this.calculateStat("attack", type),
                "crit": this.calculateStat("crit", type),
                "defense": this.calculateStat("defense", type),
                "health": health,
                "agility": this.calculateStat("agility", type),
                "speed": this.calculateStat("speed", type),
                "luck": this.calculateStat("luck", type),
                "currentHp": health
            }
        };

        return character;
    }



    calculateStat(statType, classType) {
        let min, max = 0;
        switch (statType) {
            case "attack":
                min = classType.stats.attack.min;
                max = classType.stats.attack.max;
                break;

            case "crit":
                min = classType.stats.crit.min;
                max = classType.stats.crit.max;
                break;

            case "defense":
                min = classType.stats.defense.min;
                max = classType.stats.defense.max;
                break;

            case "health":
                min = classType.stats.health.min;
                max = classType.stats.health.max;
                break;

            case "agility":
                min = classType.stats.agility.min;
                max = classType.stats.agility.max;
                break;

            case "speed":
                min = classType.stats.speed.min;
                max = classType.stats.speed.max;
                break;

            case "luck":
                min = classType.stats.luck.min;
                max = classType.stats.luck.max;
                break;

            default:
                break;
        }

        return getRandomStat(min, max);
    }

    assignCharacter(id, character) {
        $('#username-' + id).val(character.name);
        $("#review-" + id).text(character.saying);
        $('#attack-stat-' + id).text(character.stats.attack);
        $('#crit-stat-' + id).text(character.stats.crit);
        $('#defense-stat-' + id).text(character.stats.defense);
        $('#health-stat-' + id).text(character.stats.health);
        $('#agility-stat-' + id).text(character.stats.agility);
        $('#speed-stat-' + id).text(character.stats.speed);
        $('#luck-stat-' + id).text(character.stats.luck);
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

    async getSaying(seed) {
        // let rand = parseInt(Math.abs(seed).toString().slice(1, 3));
        let rand = getRandomInt(0, 50);
        let names = await readFileContents("../json/sayings.json");

        return names[rand];
    }


    async getCharacterClasses() {
        let classes = await readFileContents("../json/classes.json");

        return classes;
    }
}
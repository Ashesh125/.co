import { Audio } from "../sound/Audio.js";

export class Combat{

    constructor(){
        this.characters = JSON.parse(localStorage.getItem("characters"));
        this.enemy = this.getEnemy();
        this.all = this.characters.concat(this.enemy);     
        this.initialize();
    }

    initialize(){
        this.characters.forEach(character => {
            $(".footer-info").append(`
                <div class="col-3 footer-detail">
                    <div class="info character-img-holder">
                        <img src="${character.sprite}">
                    </div>
                    <div class="result ms-5">
                        <div class="title">${character.name}</div>
                        <div>
                            <img src="../sprites/heart.png" class="stat-icon">
                            ${character.stats.health}/${character.stats.currentHp}
                        </div>
                    </div>
                </div>`
            ); 

            $(".character-sprite").append(`
                <div class="col-4 box-1">
                    <span>${character.name}</span>
                    <div class="character-img-holder"></div>
                </div>
            `);
        });
    }

    getEnemy(){
        return [
            {
                "name": "Slime",
                "stats": {
                    "attack": { "min": 6,"max": 12 },
                    "defence": { "min": 5,"max": 8 },           
                    "crit": { "min": 10,"max": 15 },
                    "speed": { "min": 6,"max": 9 },
                    "health": { "min": 15,"max": 24 },
                    "agility": { "min": 3,"max": 6 },
                    "luck": { "min": 0,"max": 0.8 }
                }
            },
            {
                "name": "Slime",
                "stats": {
                    "attack": { "min": 6,"max": 12 },
                    "defence": { "min": 5,"max": 8 },           
                    "crit": { "min": 10,"max": 15 },
                    "speed": { "min": 6,"max": 9 },
                    "health": { "min": 15,"max": 24 },
                    "agility": { "min": 3,"max": 6 },
                    "luck": { "min": 0,"max": 0.8 }
                }
            },
            {
                "name": "Slime",
                "stats": {
                    "attack": { "min": 6,"max": 12 },
                    "defence": { "min": 5,"max": 8 },           
                    "crit": { "min": 10,"max": 15 },
                    "speed": { "min": 6,"max": 9 },
                    "health": { "min": 15,"max": 24 },
                    "agility": { "min": 3,"max": 6 },
                    "luck": { "min": 0,"max": 0.8 }
                }
            }
        ];
    }
}
import { Audio } from "../sound/Audio.js";
import { Algorithms } from "../helpers/Algorithms.js";

export class Combat{

    constructor(){
        this.algorithms = new Algorithms();
        this.characters = this.getCharacters();
        this.enemy = this.getEnemy();
        this.all = this.getTurnOrder();     
        this.turnCount = 0;
        this.initialize();
        this.start();
    }

    initialize(){
        this.all.forEach((e,i) => {
            $(".nav-bar").append(`<div class="img-${i} turn-order"  id='turn-order-${e.id}'><img src="../sprites/heart.png" class="img-thumbnail" alt="..."></div>`);
        });


        this.characters.forEach(character => {
            $(".footer-info").append(`
                <div class="col-3 footer-detail" id='footer-detail-${character.id}'>
                    <div class="info character-img-holder">
                    </div>
                    <div class="result ms-3">
                        <div class="title">${character.name}</div>
                        <div>
                            <img src="../sprites/heart.png" class="stat-icon">
                            ${character.stats.health}/${character.stats.currentHp}
                        </div>
                    </div>
                </div>`
            ); 
            $(".character-sprite").append(`
                <div class="col-4 box-1" id='sprite-${character.id}'>
                    <span>${character.name}</span>
                    <div class="character-img-holder"></div>
                </div>
            `);
        });

        this.enemy.forEach(enemy => {
            $(".footer-info").append(`
                <div class="col-2 footer-detail enemy-detail" id='footer-detail-${enemy.id}'>
                    <div class="info enemy-img-holder">
                    </div>
                    <div class="result ms-3">
                        <div class="title">${enemy.name}</div>
                        <div>
                            <img src="../sprites/heart.png" class="stat-icon">
                            ${enemy.stats.health}/${enemy.stats.currentHp}
                        </div>
                    </div>
                </div>`
            ); 

            console.log(enemy);
            $(".enemy-sprite").append(`
                <div class="col-4 box-2" id='sprite-${enemy.id}'>
                    <span>${enemy.name}</span>
                    <div class="enemy-img-holder"></div>
                </div>
            `);
        });

        this.animations();
    }


    animations(){
        let first = this.all[0];
        anime({
            targets: `.turn-order`,
            scale: [0.1, 1], 
            duration: 600, 
            easing: 'easeOutQuad' 
          });
        anime({
            targets: `#turn-order-${first.id}`,
            scale: [0.1, 1.5], 
            duration: 600, 
            easing: 'easeOutQuad' 
          });
    }

    getTurnOrder(){
        return this.algorithms.sortBySpeed(this.characters.concat(this.enemy));
    }

    getEnemy(){
        return [
            {
                "id": 1,
                "name": "Slime",
                "type": "enemy",
                "stats": {
                    "attack": 5,
                    "defense": 2,           
                    "crit": 1,
                    "speed": 5,
                    "health": 34,
                    "agility": 3,
                    "luck": 0,
                    "currentHp": 34
                }
            },
            {
                "id": 2,
                "name": "Slime",
                "type": "enemy",
                "stats": {
                    "attack": 5,
                    "defense": 2,           
                    "crit": 1,
                    "speed": 6,
                    "health": 36,
                    "agility": 3,
                    "luck": 0,
                    "currentHp": 36
                }
            },
            {
                "id": 3,
                "name": "Slime",
                "type": "enemy",
                "stats": {
                    "attack": 5,
                    "defense": 2,           
                    "crit": 1,
                    "speed": 7,
                    "health": 38,
                    "agility": 3,
                    "luck": 0,
                    "currentHp": 38
                }
            }
        ];
    }

    getCharacters(){
        let all = JSON.parse(localStorage.getItem("characters"));
        const filteredAndModified = all.map(character => {
            if (character.status === "active") {
                return { ...character, type: "player" };
            }
            return character;
        });

        return filteredAndModified;
    }

    start(){
        // while(true){
            this.turn(this.turnCount);
        // }
    }

    turn(){
        let turnOf = this.all[this.turnCount % 6];
        console.log(turnOf);
        this.turnAnimate(this.turnCount);



        this.turnCount++;
    }

    turnAnimate(turn){
        
    }

    endTurn(){
        this.turnCount++;
        this.turn(this.turnCount);
    }

    attack(){
        let who = this.all[this.turnCount % 6];
        alert(who.name)
        let whom = this.getTarget(who);
        this.turnCount++;
    }


    getTarget(attacker){
        switch(attacker.trait){
            case 0:
                let highestMaxHpEnemy = this.enemy.reduce((maxHealthPlayer, currentPlayer) => {
                    if (!maxHealthPlayer || currentPlayer.stats.health > maxHealthPlayer.stats.health) {
                      return currentPlayer;
                    }
                    return maxHealthPlayer;
                }, null);

                this.damage(attacker,highestMaxHpEnemy);

                break;

            case 1:
                let lowestCurrentHpEnemy = this.enemy.reduce((minHealthPlayer, currentPlayer) => {
                    if (!minHealthPlayer || currentPlayer.stats.health < minHealthPlayer.stats.health) {
                        return currentPlayer;
                    }
                    return minHealthPlayer;
                }, null);
                this.damage(attacker,lowestCurrentHpEnemy);
                break;

            case 2:
                let highestAttackEnemy = this.enemy.reduce((maxAttackPlayer, currentPlayer) => {
                    if (!maxAttackPlayer || currentPlayer.stats.attack > maxAttackPlayer.stats.attack) {
                        return currentPlayer;
                    }
                    return maxAttackPlayer;
                }, null);
                this.damage(attacker,highestAttackEnemy);
                break;               
            
            case 3:
                let highestSpeedEnemy = this.enemy.reduce((maxSpeedPlayer, currentPlayer) => {
                    if (!maxSpeedPlayer || currentPlayer.stats.speed > maxSpeedPlayer.stats.speed) {
                        return currentPlayer;
                    }
                    return maxSpeedPlayer;
                }, null);
                this.damage(attacker,highestSpeedEnemy);
                break;
    
            case 4:
                let highestDefenseEnemy = this.enemy.reduce((maxDefensePlayer, currentPlayer) => {
                    if (!maxDefensePlayer || currentPlayer.stats.defense > maxDefensePlayer.stats.defense) {
                        return currentPlayer;
                    }
                    return maxDefensePlayer;
                }, null);
                this.damage(attacker,highestDefenseEnemy);
                break;             
                
            case 5:
                let lowestDefenseEnemy = this.enemy.reduce((minDefensePlayer, currentPlayer) => {
                    if (!minDefensePlayer || currentPlayer.stats.defense < minDefensePlayer.stats.defense) {
                        return currentPlayer;
                    }
                    return minDefensePlayer;
                }, null);
                this.damage(attacker,lowestDefenseEnemy);
                break;
    
            default:
                let randomEnemy = Math.floor(Math.random() * this.enemy.length);
                this.damage(attacker,randomEnemy);
                break;
        }
    }

    damage(attacker,defender){
        const dodgeChance = Math.random() * 100 <= defender.stats.agility ? true : false;
        if(!dodgeChance){
            const baseDamage = Math.max(1, attacker.stats.attack - defender.stats.defense);
            const critMultiplier = Math.random() * 100 <= attacker.stats.crit ? 1.2 : 1;
            const damage = baseDamage * critMultiplier;
            if(defender.stats.currentHp > damage){
                defender.stats.currentHp -= damage;
                this.all = this.all.map(obj => {
                if (obj.id === defender.id) {
                    return {...defender};
                } else {
                    return obj; 
                }
                });
            }else if(defender.stats.currentHp < damage){
                alert("killed");
                this.all = this.all.filter(entity => entity.id !== defender.id);
            }
        }else{
            alert("missed");
        }
    }
}
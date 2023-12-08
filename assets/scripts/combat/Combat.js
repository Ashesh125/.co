import { Audio } from "../sound/Audio.js";
import { Algorithms } from "../helpers/Algorithms.js";
import { Enemies } from "../../json/enemy.js";
import { getRandomStat,getRandomInt } from "../helpers/Helper.js";

export class Combat{

    constructor(){
        this.algorithms = new Algorithms();
        this.characters = this.getCharacters();
        this.enemy = this.getEnemy();
        this.all = this.getTurnOrder();     
        this.turnCount = 0;
        this.initialize();
        console.log(this.all);
    }

    initialize(){
        this.all.forEach((e,i) => {
            $(".nav-bar").append(`<div class="turn-order" id='turn-order-${e.id}'><img src="http://127.0.0.1:5502/assets/sprites/classes/${e.sprite}" class="img-thumbnail" alt="..."></div>`);
        });

        this.characters.forEach(character => {
            $(".footer-info .player-side").append(`
                <div class="footer-detail" id='footer-detail-${character.id}'>
                    <div class="info">
                        <img src="http://127.0.0.1:5502/assets/sprites/classes/${character.sprite}" class="img-thumbnail" alt="...">
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
                    <div>
                        <img class='combat-sprite' src="http://127.0.0.1:5502/assets/sprites/classes/${character.sprite}" class="img-thumbnail" alt="...">    
                    </div>
                </div>
            `);
        });

        this.enemy.forEach(enemy => {
            $(".footer-info .enemy-side").append(`
                <div class="footer-detail col-3 enemy-detail" id='footer-detail-${enemy.id}'>
                    <div class="info">
                        <img src="http://127.0.0.1:5502/assets/sprites/classes/${enemy.sprite}" class="img-thumbnail" alt="...">
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

            $(".enemy-sprite").append(`
                <div class="col-4 box-2" id='sprite-${enemy.id}'>
                    <div>
                        <img class='combat-sprite eneny-sprite' src="http://127.0.0.1:5502/assets/sprites/classes/${enemy.sprite}" class="img-thumbnail" alt="...">
                    </div>              
                </div>
            `);
        });

        this.animations();
    }

    initialAnimation(){
        anime({
            targets: `.turn-order`,
            scale: [0.1, 1], 
            duration: 600, 
            easing: 'easeOutQuad' 
        });
    }

    animations(){
        let first = this.all[0];
        
        anime({
            targets: `#turn-order-${this.all[this.turnCount % 6].id}`,
            scale: [0.1, 1.5], 
            duration: 600, 
            easing: 'easeOutQuad'       
        });

        this.animateFirstTurn();
    }

    animateFirstTurn(){
        const first = this.all[this.turnCount % 6];
        this.turnAnimate(first);
    }

    getTurnOrder(){
        return this.algorithms.sortBySpeed(this.characters.concat(this.enemy));
    }

    getEnemy(){
        const enemies = Enemies;

        const numberOfEnemies = 3; 
        const shuffledEnemies = enemies.sort(() => Math.random() - 0.5);
        const enemiesWithTraits = shuffledEnemies.slice(0, numberOfEnemies).map(enemy => ({
            ...enemy,
            trait: Math.floor(Math.random() * 7) 
        }));

        let s = enemiesWithTraits.slice(0, numberOfEnemies);
        let e = [];
        let self = this; 
        s.forEach(function(element) {
            e.push(self.newEnemy(element));
        })
        
        return e;
    }

    newEnemy(type) {
        let health = type.stats.health;
        var enemy = {
            'id': getRandomInt(1,9999999),
            "name": type.name,
            "sprite": type.sprite,
            "type": "monster",
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

        return enemy;
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

    turn(){
        this.attack();
    }

    turnAnimate(target){
        if(target.type === 'player'){
            anime({
                targets: `#sprite-${target.id}`,
                translateX: [0, 300], 
                duration: 1000, 
                easing: 'easeOutQuad'       
            });
        }else{
            anime({
                targets: `#sprite-${target.id}`,
                translateX: [0, -300], 
                duration: 1000, 
                easing: 'easeOutQuad'       
            });
        }
    }

    endTurnAnimate(turn){
        const previous = this.all[(turn + 5) % 6];
        const target = this.all[turn % 6];
        anime({
            targets: `#turn-order-${previous.id}`,
            scale: [1.5, 1], 
            duration: 1000, 
            easing: 'easeOutQuad' 
          });

        anime({
            targets: `#turn-order-${target.id}`,
            scale: [1, 1.5], 
            duration: 1000, 
            easing: 'easeOutQuad' 
          });

        this.turnAnimate(target);
        if(previous.type === 'player'){
            anime({
                targets: `#sprite-${previous.id}`,
                translateX: [300, 0], 
                duration: 600, 
                easing: 'easeOutQuad'       
            });
        }else{
            anime({
                targets: `#sprite-${previous.id}`,
                translateX: [-300, 0], 
                duration: 600, 
                easing: 'easeOutQuad'       
            });
        }

    }

    endTurn(){
        this.turnCount++;
        this.endTurnAnimate(this.turnCount);
        if(this.all[this.turnCount % 6].type !== 'player'){
            this.turn(this.turnCount);
        }
    }

    attack(){
        let turn = this.turnCount % 6;
        let who = this.all[turn];
        // alert(`${turn}-${who.name}`)
        this.turnAnimate(turn);
        let whom = this.getTarget(who);

        this.endTurn();
    }


    getTarget(attacker){
        let target = (attacker.type === 'player') ? this.enemy : this.characters;
        switch(attacker.trait){
            case 0:
                let highestMaxHpEnemy = target.reduce((maxHealthPlayer, currentPlayer) => {
                    if (!maxHealthPlayer || currentPlayer.stats.health > maxHealthPlayer.stats.health) {
                      return currentPlayer;
                    }
                    return maxHealthPlayer;
                }, null);

                this.damage(attacker,highestMaxHpEnemy);

                break;

            case 1:
                let lowestCurrentHpEnemy = target.reduce((minHealthPlayer, currentPlayer) => {
                    if (!minHealthPlayer || currentPlayer.stats.health < minHealthPlayer.stats.health) {
                        return currentPlayer;
                    }
                    return minHealthPlayer;
                }, null);
                this.damage(attacker,lowestCurrentHpEnemy);
                break;

            case 2:
                let highestAttackEnemy = target.reduce((maxAttackPlayer, currentPlayer) => {
                    if (!maxAttackPlayer || currentPlayer.stats.attack > maxAttackPlayer.stats.attack) {
                        return currentPlayer;
                    }
                    return maxAttackPlayer;
                }, null);
                this.damage(attacker,highestAttackEnemy);
                break;               
            
            case 3:
                let highestSpeedEnemy = target.reduce((maxSpeedPlayer, currentPlayer) => {
                    if (!maxSpeedPlayer || currentPlayer.stats.speed > maxSpeedPlayer.stats.speed) {
                        return currentPlayer;
                    }
                    return maxSpeedPlayer;
                }, null);
                this.damage(attacker,highestSpeedEnemy);
                break;
    
            case 4:
                let highestDefenseEnemy = target.reduce((maxDefensePlayer, currentPlayer) => {
                    if (!maxDefensePlayer || currentPlayer.stats.defense > maxDefensePlayer.stats.defense) {
                        return currentPlayer;
                    }
                    return maxDefensePlayer;
                }, null);
                this.damage(attacker,highestDefenseEnemy);
                break;             
                
            case 5:
                let lowestDefenseEnemy = target.reduce((minDefensePlayer, currentPlayer) => {
                    if (!minDefensePlayer || currentPlayer.stats.defense < minDefensePlayer.stats.defense) {
                        return currentPlayer;
                    }
                    return minDefensePlayer;
                }, null);
                this.damage(attacker,lowestDefenseEnemy);
                break;
    
            default:
                let randomEnemy = target[Math.floor(Math.random() * target.length)];
                this.damage(attacker,randomEnemy);
                break;
        }
    }

    damage(attacker,defender){
        console.log(attacker,"attacking",defender);
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

}
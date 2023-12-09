import { Audio } from "../sound/Audio.js";
import { Algorithms } from "../helpers/Algorithms.js";
import { Enemies } from "../../json/enemy.js";
import { getRandomStat,getRandomInt,replaceObjectById } from "../helpers/Helper.js";
import Swal from "../../../node_modules/sweetalert2/src/sweetalert2.js";
import Loot from "../../json/loot.js";
import {items} from "../../json/items.js";
import { Item } from "../Item/Item.js";
import { Save } from "../save/Save.js";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

export class Combat{

    constructor(){
        this.algorithms = new Algorithms();
        this.characters = this.getCharacters();
        this.enemy = this.getEnemy();
        this.all = this.getTurnOrder();     
        this.turnCount = 0;
        this.initialize();
        this.killed = {
            "player": [],
            "enemy": []
        };
        this.loot = [];
        this.item = new Item();
        this.totalGold = 0;
    }

    setNav(type){
        $(".nav-bar").empty();
        this.all.forEach((e,i) => {
            $(".nav-bar").append(`<div class="turn-order" id='turn-order-${e.id}'><img src="http://127.0.0.1:5502/assets/sprites/classes/${e.sprite}" class="img-thumbnail" alt="..."></div>`);
        });

        if(type === 1){
            anime({
                targets: `#turn-order-${this.all[this.turnCount % this.all.length].id}`,
                scale: [0.1, 1.5], 
                duration: 600, 
                easing: 'easeOutQuad'       
            });
        }
        
    }

    initialize(){
        this.setNav(0);

        this.characters.forEach(character => {
            $(".footer-info .player-side").append(`
                <div class="footer-detail d-flex" id='footer-detail-${character.id}'>
                    <div class="info">
                        <img class='character-img bg-light' src="http://127.0.0.1:5502/assets/sprites/classes/${character.sprite}" class="img-thumbnail" alt="...">
                    </div>
                    <div class="result ms-3">
                        <div class="title">${character.name}</div>
                        <div>
                            <img src="../sprites/heart.png" class="stat-icon">
                            ${character.stats.health}/<span id='currentHp-${character.id}'>${character.stats.currentHp}</span>
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
                <div class="footer-detail d-flex col-3 enemy-detail" id='footer-detail-${enemy.id}'>
                    <div class="info">
                        <img  class='character-img bg-light'  src="http://127.0.0.1:5502/assets/sprites/classes/${enemy.sprite}" class="img-thumbnail" alt="...">
                    </div>
                    <div class="result ms-3">
                        <div class="title">${enemy.name}</div>
                        <div>
                            <img src="../sprites/heart.png" class="stat-icon">
                            ${enemy.stats.health}/<span id='currentHp-${enemy.id}'>${enemy.stats.currentHp}</span>
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
        setTimeout(()=>{
            if(this.all[this.turnCount].type === "monster"){
                this.attack();
            }
        },1200);
        this.makeDropDown();
        this.initialAnimation();
     
    }

    initialAnimation(){
        anime({
            targets: `.turn-order`,
            scale: [0.1, 1], 
            duration: 600, 
            easing: 'easeOutQuad' 
        });
        this.animateFirstTurn();
    }
    
    animateFirstTurn(){
        const first = this.all[this.turnCount % this.all.length];
        this.turnAnimate(first);
    }

    getTurnOrder(){
        return this.algorithms.sortBySpeed(this.characters.concat(this.enemy));
    }

    getEnemy(){
        const enemies = Enemies;

        const numberOfEnemies = 3; // Number of random enemies you want to retrieve
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
            },
            "loot_table_id": type.loot_table_id
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
        $("#attack").click();
    }

    turnAnimate(target){     
        Toast.fire({
            width: '400px',
            title: `<img class='character-img me-3' src='http://127.0.0.1:5502/assets/sprites/classes/${target.sprite}'>${target.name}'s turn `
          });

        anime({
            targets: `#turn-order-${target.id}`,
            scale: [0.1, 1.5], 
            duration: 600, 
            easing: 'easeOutQuad'       
        });
        
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
        const previous = this.all[(turn + this.all.length-1) % this.all.length];
        const target = this.all[turn % this.all.length];
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

        // this.turnAnimate(target);
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
    
        setTimeout(() => {
            if (this.all[this.turnCount % this.all.length].type !== 'player') {
              this.turn(this.turnCount);
            } else {
                $(".actions").show();
            }
        }, 3000);
    }

    attack(target){
        let whom;
        let turn = this.turnCount % this.all.length;
        let who = this.all[turn];
        if(who.type === 'player'){
            whom = this.all.find(function(obj) {
                return obj.id == target;
              });
            this.damage(who,whom);
        }else{
            whom = this.getTarget(who);
        }
        this.endTurn();
        setTimeout(() => {
            this.turnAnimate(this.all[this.turnCount % this.all.length]);
        },1000);
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

    async damage(attacker,defender){
        const dodgeChance = Math.random() * 100 <= defender.stats.agility ? true : false;
        if(!dodgeChance){
            const baseDamage = Math.max(1, attacker.stats.attack +10 - defender.stats.defense);
            const critMultiplier = Math.random() * 100 <= attacker.stats.crit ? 1.2 : 1;
            const damage = (baseDamage * critMultiplier).toFixed(1);
            if(parseInt(defender.stats.currentHp) > damage){
                defender.stats.currentHp = (defender.stats.currentHp - damage).toFixed(1);
                console.log(attacker,'damage',defender,'by',damage,)
                setTimeout(() => {
                    Toast.fire({    
                        title :`<img class='character-img me-3' src='http://127.0.0.1:5502/assets/sprites/classes/${defender.sprite}'>${defender.name} took ${damage} damage`
                    });
                    $(`#currentHp-${defender.id}`).text(defender.stats.currentHp);
                    this.all = this.all.map(obj => {
                        if (obj.id === defender.id) {
                            return {...defender};
                        } else {
                            return obj; 
                        }
                        });
                    },10);
            }else if(parseInt(defender.stats.currentHp) <= damage){
                setTimeout(() => {
                Toast.fire({    
                    title :`<img class='character-img me-3' src='http://127.0.0.1:5502/assets/sprites/classes/${defender.sprite}'>${defender.name} Was Killed`
                });
                $(`#currentHp-${defender.id}`).text(0);

                if(defender.type === "monster"){
                    this.killed['enemy'].push(defender);
                    setTimeout(() => {
                        this.getLoot(defender);
                    },10);    
                    this.enemy = this.enemy.filter(entity => entity.id !== defender.id);
                    this.makeDropDown();    
                }else{
                    this.killed['player'].push(defender);
                    this.characters = this.characters.filter(entity => entity.id !== defender.id);
                }
                this.all = this.all.filter(entity => entity.id !== defender.id);
               
                this.setNav(1);

                $(`#sprite-${defender.id}`).css('visibility', 'hidden');
                setTimeout(() => {
                    if(this.enemy.length === 0){
                        this.endCombat();
                    }
                },100);
                
                }, 10);
                console.log("new array",this.all);
            }
        }else{
            Toast.fire({    
                title :`<img class='character-img me-3' src='http://127.0.0.1:5502/assets/sprites/classes/${attacker.sprite}'>${attacker.name} Missed`
            });
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

    makeDropDown(){
        $("#enemy-dropdown").empty();
        this.enemy.forEach(enemy => {
            $("#enemy-dropdown").append(`
            <li class='attackEnemy' data-attribute='${enemy.id}'>
                <div class='d-flex col-12'>
                    <img class='character-img' src="http://127.0.0.1:5502/assets/sprites/classes/${enemy.sprite}">
                    <span class='text-center'>${enemy.name}</span>
                </div>
            </li>
            `)
        });
    }

    getLoot(target){
        let table = Loot.find(function(obj) {
            return obj.id === target.loot_table_id;
        });

        let gold = getRandomInt(table.gold.min,table.gold.max);       
        Toast.fire({
            title: `${target.name} dropped ${gold}  <img class='character-img' src="http://127.0.0.1:5502/assets/sprites/Golden%20Coin.png">`
        });
        this.totalGold += gold;
        $("#temp-gold-holder").val(this.totalGold);
        let loot = this.calculateLootDrop(table.items);
        if(loot.length > 1){
            loot.forEach(loot => {
                this.item.addInInventory(loot.item_id,loot.qty);
            });
        }else if(loot){
            this.item.addInInventory(loot.item_id,loot.qty);
        }
    }

    calculateLootDrop(lootData) {
        const totalChance = lootData.reduce((acc, item) => acc + item.chance, 0);
    
        const randomNumber = Math.floor(Math.random() * totalChance) + 1;
      
        let cumulativeChance = 0;
        for (const item of lootData) {
          cumulativeChance += item.chance;
          if (randomNumber <= cumulativeChance) {
            return {
              "item_id": item.item_id,
              "qty": Math.floor(Math.random() * (item.qty.max - item.qty.min + 1)) + item.qty.min
            };
          }
        }
      
        return null;
    }

    endCombat(){
        let saves = JSON.parse(localStorage.getItem('saves'));
        let gameState = JSON.parse(localStorage.getItem('gameState'));
    
        let save = saves.find(function(obj) {
            return obj.id == gameState.id;
          });
          
        save.gold = parseInt(save.gold) + this.totalGold;
        gameState.gold = parseInt(gameState.gold) + this.totalGold;
        save.inventory = JSON.parse(localStorage.getItem('inventory'));
        save.characters = this.all.filter(obj => obj.type === 'player' && obj.stats.currentHp > 0);
        saves = replaceObjectById(saves,save);

        localStorage.setItem('gameState',JSON.stringify(gameState));
        localStorage.setItem('saves',JSON.stringify(saves));
        window.location.href = `http://127.0.0.1:5502/assets/pages/world.html`;
    }
}
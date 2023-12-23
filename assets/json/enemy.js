export var Enemies = [
    {
        "id": "e00",
        "name": "Goblin",
        "sprite": "zombie.png",
        "stats": {
            "attack": { "min": 4, "max": 8 },
            "defense": { "min": 3, "max": 6 },
            "crit": { "min": 5, "max": 8 },
            "speed": { "min": 5, "max": 8 },
            "health": 25,
            "currentHp": 25,
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.3 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e01",
        "name": "Skeleton",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 5, "max": 9 },
            "defense": { "min": 4, "max": 7 },
            "crit": { "min": 5, "max": 10 },
            "speed": { "min": 4, "max": 7 },
            "health": 30,
            "currentHp": 30,
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e02",
        "name": "Orc",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 6, "max": 11 },
            "defense": { "min": 5, "max": 9 },
            "crit": { "min": 6, "max": 10 },
            "speed": { "min": 5, "max": 8 },
            "health": 35,
            "currentHp": 35,
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e03",
        "name": "Dark Mage",
        "sprite": "eye.png",
        "stats": {
            "attack": { "min": 8, "max": 14 },
            "defense": { "min": 6, "max": 10 },
            "crit": { "min": 12, "max": 18 },
            "speed": { "min": 5, "max": 9 },
            "health": 45,
            "currentHp": 45,
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e04",
        "name": "Dragon",
        "sprite": "zombiedragon.png",
        "stats": {
            "attack": { "min": 12, "max": 18 },
            "defense": { "min": 10, "max": 15 },
            "crit": { "min": 8, "max": 14 },
            "speed": { "min": 7, "max": 11 },
            "health": 90,
            "currentHp": 90,
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.6 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e05",
        "name": "Wraith",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 7, "max": 12 },
            "defense": { "min": 5, "max": 9 },
            "crit": { "min": 10, "max": 15 },
            "speed": { "min": 6, "max": 9 },
            "health": 40,
            "currentHp": 40,
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e06",
        "name": "Werewolf",
        "sprite": "wolf.png",
        "stats": {
            "attack": { "min": 8, "max": 13 },
            "defense": { "min": 6, "max": 10 },
            "crit": { "min": 8, "max": 12 },
            "speed": { "min": 7, "max": 10 },
            "health": 50,
            "currentHp": 50,
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.5 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e07",
        "name": "Troll",
        "sprite": "cyclops.png",
        "stats": {
            "attack": { "min": 9, "max": 14 },
            "defense": { "min": 8, "max": 12 },
            "crit": { "min": 5, "max": 9 },
            "speed": { "min": 4, "max": 7 },
            "health": 55,
            "currentHp": 55,
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    // {
    //     "id": "e08",
    //     "name": "Slime",
    //     "sprite": "gorgon.png",
    //     "stats": {
    //         "attack": { "min": 3, "max": 6 },
    //         "defense": { "min": 2, "max": 5 },
    //         "crit": { "min": 3, "max": 7 },
    //         "speed": { "min": 3, "max": 6 },
    //         "health": 20,
    //         "currentHp": 20,
    //         "agility": { "min": 3, "max": 5 },
    //         "luck": { "min": 0, "max": 0.2 }
    //     },
    //    "loot_table_id" : 1
    // },
    {
        "id": "e09",
        "name": "Vampire",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 10, "max": 16 },
            "defense": { "min": 7, "max": 11 },
            "crit": { "min": 8, "max": 13 },
            "speed": { "min": 8, "max": 12 },
            "health": 65,
            "currentHp": 65,
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.6 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e10",
        "name": "Elemental",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 9, "max": 15 },
            "defense": { "min": 9, "max": 14 },
            "crit": { "min": 10, "max": 16 },
            "speed": { "min": 6, "max": 10 },
            "health": 50,
            "currentHp": 50,
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        },
        "loot_table_id" : 1
    },{
        "id": "e12",
        "name": "Harpy",
        "sprite": "cerebus.png",
        "stats": {
            "attack": { "min": 6, "max": 11 },
            "defense": { "min": 4, "max": 8 },
            "crit": { "min": 9, "max": 14 },
            "speed": { "min": 8, "max": 12 },
            "health": 40,
            "currentHp": 40,
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e13",
        "name": "Giant Spider",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 6, "max": 10 },
            "defense": { "min": 7, "max": 12 },
            "crit": { "min": 7, "max": 12 },
            "speed": { "min": 6, "max": 9 },
            "health": 35,
            "currentHp": 35,
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e14",
        "name": "Zombie",
        "sprite": "zombie.png",
        "stats": {
            "attack": { "min": 5, "max": 9 },
            "defense": { "min": 6, "max": 11 },
            "crit": { "min": 5, "max": 10 },
            "speed": { "min": 4, "max": 7 },
            "health": 25,
            "currentHp": 25,
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.3 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e15",
        "name": "Minotaur",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 9, "max": 14 },
            "defense": { "min": 8, "max": 13 },
            "crit": { "min": 6, "max": 11 },
            "speed": { "min": 5, "max": 8 },
            "health": 60,
            "currentHp": 60,
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e16",
        "name": "Witch",
        "sprite": "gorgon.png",
        "stats": {
            "attack": { "min": 7, "max": 13 },
            "defense": { "min": 6, "max": 11 },
            "crit": { "min": 9, "max": 15 },
            "speed": { "min": 6, "max": 9 },
            "health": 45,
            "currentHp": 45,
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e17",
        "name": "Ghost",
        "sprite": "gorgon.png",
        "stats": {  
            "attack": { "min": 7, "max": 12 },
            "defense": { "min": 4, "max": 8 },
            "crit": { "min": 8, "max": 13 },
            "speed": { "min": 8, "max": 11 },
            "health": 35,
            "currentHp": 35,
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e18",
        "name": "Cyclops",
        "sprite": "cyclops.png",
        "stats": {
            "attack": { "min": 10, "max": 16 },
            "defense": { "min": 9, "max": 14 },
            "crit": { "min": 7, "max": 12 },
            "speed": { "min": 4, "max": 7 },
            "health": 75,
            "currentHp": 75,
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        },
        "loot_table_id" : 1
    },
    {
        "id": "e19",
        "name": "Imp",
        "sprite": "eye.png",
        "stats": {
            "attack": { "min": 4, "max": 7 },
            "defense": { "min": 3, "max": 6 },
            "crit": { "min": 6, "max": 10 },
            "speed": { "min": 7, "max": 10 },
            "health": 30,
            "currentHp": 30,
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.3 }
        },
        "loot_table_id" : 1
    }
];


export var enemies = [
    {
        "id": "e00",
        "name": "Goblin",
        "stats": {
            "attack": { "min": 4, "max": 8 },
            "defense": { "min": 3, "max": 6 },
            "crit": { "min": 5, "max": 8 },
            "speed": { "min": 5, "max": 8 },
            "health": { "min": 20, "max": 30 },
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.3 }
        }
    },
    {
        "id": "e01",
        "name": "Skeleton",
        "stats": {
            "attack": { "min": 5, "max": 9 },
            "defense": { "min": 4, "max": 7 },
            "crit": { "min": 5, "max": 10 },
            "speed": { "min": 4, "max": 7 },
            "health": { "min": 25, "max": 35 },
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e02",
        "name": "Orc",
        "stats": {
            "attack": { "min": 6, "max": 11 },
            "defense": { "min": 5, "max": 9 },
            "crit": { "min": 6, "max": 10 },
            "speed": { "min": 5, "max": 8 },
            "health": { "min": 30, "max": 40 },
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e03",
        "name": "Dark Mage",
        "stats": {
            "attack": { "min": 8, "max": 14 },
            "defense": { "min": 6, "max": 10 },
            "crit": { "min": 12, "max": 18 },
            "speed": { "min": 5, "max": 9 },
            "health": { "min": 40, "max": 50 },
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        }
    },
    {
        "id": "e04",
        "name": "Dragon",
        "stats": {
            "attack": { "min": 12, "max": 18 },
            "defense": { "min": 10, "max": 15 },
            "crit": { "min": 8, "max": 14 },
            "speed": { "min": 7, "max": 11 },
            "health": { "min": 80, "max": 100 },
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.6 }
        }
    },
    {
        "id": "e05",
        "name": "Wraith",
        "stats": {
            "attack": { "min": 7, "max": 12 },
            "defense": { "min": 5, "max": 9 },
            "crit": { "min": 10, "max": 15 },
            "speed": { "min": 6, "max": 9 },
            "health": { "min": 35, "max": 45 },
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e06",
        "name": "Werewolf",
        "stats": {
            "attack": { "min": 8, "max": 13 },
            "defense": { "min": 6, "max": 10 },
            "crit": { "min": 8, "max": 12 },
            "speed": { "min": 7, "max": 10 },
            "health": { "min": 45, "max": 55 },
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.5 }
        }
    },
    {
        "id": "e07",
        "name": "Troll",
        "stats": {
            "attack": { "min": 9, "max": 14 },
            "defense": { "min": 8, "max": 12 },
            "crit": { "min": 5, "max": 9 },
            "speed": { "min": 4, "max": 7 },
            "health": { "min": 50, "max": 60 },
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e08",
        "name": "Slime",
        "stats": {
            "attack": { "min": 3, "max": 6 },
            "defense": { "min": 2, "max": 5 },
            "crit": { "min": 3, "max": 7 },
            "speed": { "min": 3, "max": 6 },
            "health": { "min": 15, "max": 25 },
            "agility": { "min": 3, "max": 5 },
            "luck": { "min": 0, "max": 0.2 }
        }
    },
    {
        "id": "e09",
        "name": "Vampire",
        "stats": {
            "attack": { "min": 10, "max": 16 },
            "defense": { "min": 7, "max": 11 },
            "crit": { "min": 8, "max": 13 },
            "speed": { "min": 8, "max": 12 },
            "health": { "min": 60, "max": 70 },
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.6 }
        }
    },
    {
        "id": "e10",
        "name": "Elemental",
        "stats": {
            "attack": { "min": 9, "max": 15 },
            "defense": { "min": 9, "max": 14 },
            "crit": { "min": 10, "max": 16 },
            "speed": { "min": 6, "max": 10 },
            "health": { "min": 55, "max": 65 },
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        }
    },{
        "id": "e12",
        "name": "Harpy",
        "stats": {
            "attack": { "min": 6, "max": 11 },
            "defense": { "min": 4, "max": 8 },
            "crit": { "min": 9, "max": 14 },
            "speed": { "min": 8, "max": 12 },
            "health": { "min": 35, "max": 45 },
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e13",
        "name": "Giant Spider",
        "stats": {
            "attack": { "min": 6, "max": 10 },
            "defense": { "min": 7, "max": 12 },
            "crit": { "min": 7, "max": 12 },
            "speed": { "min": 6, "max": 9 },
            "health": { "min": 30, "max": 40 },
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e14",
        "name": "Zombie",
        "stats": {
            "attack": { "min": 5, "max": 9 },
            "defense": { "min": 6, "max": 11 },
            "crit": { "min": 5, "max": 10 },
            "speed": { "min": 4, "max": 7 },
            "health": { "min": 25, "max": 35 },
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.3 }
        }
    },
    {
        "id": "e15",
        "name": "Minotaur",
        "stats": {
            "attack": { "min": 9, "max": 14 },
            "defense": { "min": 8, "max": 13 },
            "crit": { "min": 6, "max": 11 },
            "speed": { "min": 5, "max": 8 },
            "health": { "min": 60, "max": 70 },
            "agility": { "min": 5, "max": 7 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e16",
        "name": "Witch",
        "stats": {
            "attack": { "min": 7, "max": 13 },
            "defense": { "min": 6, "max": 11 },
            "crit": { "min": 9, "max": 15 },
            "speed": { "min": 6, "max": 9 },
            "health": { "min": 40, "max": 50 },
            "agility": { "min": 6, "max": 8 },
            "luck": { "min": 0, "max": 0.5 }
        }
    },
    {
        "id": "e17",
        "name": "Ghost",
        "stats": {
            "attack": { "min": 7, "max": 12 },
            "defense": { "min": 4, "max": 8 },
            "crit": { "min": 8, "max": 13 },
            "speed": { "min": 8, "max": 11 },
            "health": { "min": 30, "max": 40 },
            "agility": { "min": 8, "max": 10 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e18",
        "name": "Cyclops",
        "stats": {
            "attack": { "min": 10, "max": 16 },
            "defense": { "min": 9, "max": 14 },
            "crit": { "min": 7, "max": 12 },
            "speed": { "min": 4, "max": 7 },
            "health": { "min": 70, "max": 80 },
            "agility": { "min": 4, "max": 6 },
            "luck": { "min": 0, "max": 0.4 }
        }
    },
    {
        "id": "e19",
        "name": "Imp",
        "stats": {
            "attack": { "min": 4, "max": 7 },
            "defense": { "min": 3, "max": 6 },
            "crit": { "min": 6, "max": 10 },
            "speed": { "min": 7, "max": 10 },
            "health": { "min": 20, "max": 30 },
            "agility": { "min": 7, "max": 9 },
            "luck": { "min": 0, "max": 0.3 }
        }
    }
];


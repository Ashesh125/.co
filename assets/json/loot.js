const Loot = [
    {
        "id": 1,
        "gold" : {min: 1, max: 3},
        "items": [
            {
                "item_id": 10,
                "chance": 100,
                "qty": {min: 2, max: 5},
            },
            {
                "item_id": 11,
                "chance": 5,
                "qty": {min: 1, max: 1},
            },
            {
                "item_id": 9,
                "chance": 2,
                "qty": {min: 1, max: 1},
            },
            {
                "item_id": 8,
                "chance": 10,
                "qty": {min: 1, max: 1},
            },
        ]
    },
    {
        "id": 2,
        "gold" : {min: 2, max: 10},
        "items": [
            {
                "item_id": 6,
                "chance": 40,
                "qty": {min: 1, max: 1},
            },
        ]
    },
    {
        "id": 3,
        "gold" : {min: 2, max: 10},
        "items": [
            {
                "item_id": 5,
                "chance": 40,
                "qty": {min: 1, max: 1},
            },
        ]
    },
    {
        "id": 4,
        "gold" : {min: 10, max: 15},
        "items": [
            {
                "item_id": 1,
                "chance": 80,
                "qty": {min: 1, max: 3},
            },
            {
                "item_id": 2,
                "chance": 20,
                "qty": {min: 1, max: 2},
            },
        ]
    },
];

export default Loot;
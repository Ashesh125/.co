class Algorithms {
    constructor() {
        this.array = [{
                "id": "1",
                "name": "suja mahrjan",
                "gender": "female",
                "stats": {
                    "attack": "2.3",
                    "health": "2.3",
                    "crit": "2.3",
                }
            },
            {
                "id": "4",
                "name": "rass mahrjan",
                "gender": "female",
                "stats": {
                    "attack": "2.3",
                    "health": "2.3",
                    "crit": "2.3",
                }
            },
            {
                "id": "2",
                "name": "kriti mahrjan",
                "gender": "female",
                "stats": {
                    "attack": "2.3",
                    "health": "2.3",
                    "crit": "2.3",
                }
            }
        ];
    }
    sortById() {
        let arr = this.array; // Get the array from the class property
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            let j = i - 1;
            let current = arr[i];
            while (j > -1 && parseInt(arr[j].id) > parseInt(current.id)) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = current;
        }
        return arr;
    }
}

// Creating an instance of MyClass
// const myObject = new MyClass();

// // Sort the array using the sortById() method
// myObject.sortById();

// console.log(myObject.array);
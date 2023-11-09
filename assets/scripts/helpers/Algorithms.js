export class Algorithms {
    constructor() {
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

    sortBySpeed(arr) {
        for (let i = 1; i < arr.length; i++) {
            let j = i - 1;
            let current = arr[i];
            while (j >= 0 && parseInt(arr[j].stats.speed) < parseInt(current.stats.speed)) {
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
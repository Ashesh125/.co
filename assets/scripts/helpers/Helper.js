import { Tile } from '../world/Tile.js';

function convertJsonIntoHashMap(json) {
    const hashMap = new Map();
    for (const [key, value] of Object.entries(json)) {
        hashMap.set(key, value);
    }
    return hashMap;
}

function openFile(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function() {
            const text = reader.result;
            console.log(reader.result.substring(0, 200));
            resolve(text);
        };
        reader.onerror = function() {
            reject(reader.error);
        }
        reader.readAsText(file);
    });
};


function readFile(path) {
    const file = new File([path], path);
    openFile(file)
        .then(function(result) {
            console.log("result", result);
            return result;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function readFileContents(path) {
    return fetch(path)
        .then(response => response.json())
        .catch(error => {
            console.error('Error reading file:', error);
            return null;
        });
}

function spiralTraverseGraph(chunk_id) {
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]; // Right, Down, Left, Up
    let x = 5;
    let z = 5;
    let directionIndex = 0;
    let steps = 1;
    let count = 0;

    let tile = new Tile(chunk_id, x, z);
    if (!tile.checkTile('water')) {
        return { x: x, z: z };
    } else {
        while (x !== 0 || z !== 0) {
            x += directions[directionIndex][0];
            z += directions[directionIndex][1];

            let tile = new Tile(chunk_id, x, z);
            if (!tile.checkTile("water")) {
                return { x: x, z: z };
            }
            count++;
            if (count === steps) {
                directionIndex = (directionIndex + 1) % 4;
                if (directionIndex % 2 === 0) {
                    steps++;
                }
                count = 0;
            }
        }
    }

    return null;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateRandomStat(min, max) {
    var randomNumber = Math.random() * (max - min) + min; // Generate a random number within the specified range
    randomNumber = randomNumber.toFixed(1); // Limit the number to 1 decimal place
    return parseFloat(randomNumber); // Convert the string back to a number
}
    function generateRandomNumber01() {
        return parseFloat((Math.random()).toFixed(1));
    }
      
    function findObjectById(jsonArray, id) {
        return jsonArray.find(function(obj) {
          return obj.id === id;
        });
    }

    function replaceObjectById(jsonArray, newObject) {
        const index = jsonArray.findIndex(function(obj) {
          return obj.id === newObject.id;
        });
      
        if (index !== -1) {
          jsonArray[index] = newObject;
        }
      
        return jsonArray;
      }

      function popUp(message){
        $('#pop-up').modal("toggle");
        $("#pop-up-content").text(message);
      }

      function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      function getCurrentDateTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
export {popUp,readFile,spiralTraverseGraph,convertJsonIntoHashMap,getRandomInt,readFileContents,generateRandomNumber01,findObjectById,replaceObjectById,getCurrentDate,getCurrentDateTime,generateRandomStat }
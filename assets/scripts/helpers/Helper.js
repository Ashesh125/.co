import { Tile } from '../world/Tile.js';

export function convertJsonIntoHashMap(json) {
    const hashMap = new Map();
    for (const [key, value] of Object.entries(json)) {
        hashMap.set(key, value);
    }
    return hashMap;
}

export function openFile(file) {
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


export function readFile(path) {
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

export function readFileContents(path) {
    return fetch(path)
        .then(response => response.json())
        .catch(error => {
            console.error('Error reading file:', error);
            return null;
        });
}

export function spiralTraverseGraph(chunk_id,x,z) {
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]; // Right, Down, Left, Up
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

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumber01() {
        return parseFloat((Math.random()).toFixed(1));
    }
      
    export function findObjectById(jsonArray, id) {
        return jsonArray.find(function(obj) {
          return obj.id === id;
        });
    }

    export function replaceObjectById(jsonArray, newObject) {
        const index = jsonArray.findIndex(function(obj) {
          return obj.id === newObject.id;
        });
      
        if (index !== -1) {
          jsonArray[index] = newObject;
        }
      
        return jsonArray;
      }

      export function popUp(message){
        $('#pop-up').modal("toggle");
        $("#pop-up-content").text(message);
      }

      export function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

       export function getCurrentDateTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }

       export function getRandomStat(min, max) {
        const d = 10;
        return Math.round((Math.random() * (max * d - min * d) + min * d)) / d;
      }

      export function distanceFormula(pointA,pointB){
        const deltaX = Math.abs(pointB.x - pointA.x);
        const deltaZ = Math.abs(pointB.z - pointA.z);
        return Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
      }

      export function getAddOrSubtractToReachB(pointA, pointB) {
        const Bx = pointB.x - pointA.x;
        const Bz = pointB.z - pointA.z;
    
        let xDirection = "";
        let zDirection = "";
    
        if (Bx > 0) {
            xDirection = "Add";
        } else if (Bx < 0) {
            xDirection = "Subtract";
        } else {
            xDirection = "No change";
        }
    
        if (Bz > 0) {
            zDirection = "Add";
        } else if (Bz < 0) {
            zDirection = "Subtract";
        } else {
            zDirection = "No change";
        }
    
        return { xDirection, zDirection };
    }

    export function moveInDir(dir,px,pz){

        if(dir.xDirection == "Subtract" && dir.zDirection == "No change"){
            //left
            return {a: [px,0], b:[-1,0], c: [px,9]};
        }else if(dir.xDirection == "Subtract" && dir.zDirection == "Add"){
            //top left
            return {a: [0,0], b:[-1,0], c:[0,9]};
        }else if(dir.xDirection == "Subtract" && dir.zDirection == "Subtract"){
            //bottom left
            return {a: [9,0], b:[-1,0], c:[9,9]};
        }else if(dir.xDirection == "Add" && dir.zDirection == "No change"){
            //right
            return {a: [px,9], b:[1,0], c:[px,0]};
        }else if(dir.xDirection == "Add" && dir.zDirection == "Add"){
            //top right
            return {a: [0,9], b:[0,1], c:[9,9]};
        }else if(dir.xDirection == "Add" && dir.zDirection == "Subtract"){
            //bottom right
            return {a: [9,9], b:[0,-1], c:[0,9]};
        }else if(dir.xDirection == "No change" && dir.zDirection == "No change"){
            //same
            return {a: [px,pz], b:[0,0], c:[0,0]};
        }else if(dir.xDirection == "No change" && dir.zDirection == "Add"){
            //top
            return {a: [0,pz], b:[0,1], c:[9,pz]};
        }else if(dir.xDirection == "No change" && dir.zDirection == "Subtract"){
            //bottom
            return {a: [9,pz], b:[0,-1], c:[0,pz]};
        }
    }

    export function inSameChunk(current,next){
        return next.x === current.x && next.z === current.z;
    }
    
    export function pause(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
    
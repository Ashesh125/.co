export class Helper {
    static convertJsonIntoHashMap(json) {
        const hashMap = new Map();
        for (const [key, value] of Object.entries(json)) {
            hashMap.set(key, value);
        }
        return hashMap;
    }

    static openFile(event) {
        return new Promise(function(resolve, reject) {
            const input = event.target;
            const reader = new FileReader();
            reader.onload = function() {
                const text = reader.result;
                const node = document.getElementById('output');
                node.innerText = text;
                console.log(reader.result.substring(0, 200));
                resolve(text);
            };
            reader.onerror = function() {
                reject(reader.error);
            }
            reader.readAsText(input.files[0]);
        });
    };
    
    
    static readFile(event) {
        openFile(event)
            .then(function(result) {
                console.log("suja");
            })
            .catch(function(error) {
                console.log(error);
            });
    }
 
    spiralTraverseGraph(chunk_id) {
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
        let x = 5;
        let z = 5;
        let directionIndex = 0;
        let steps = 1;
        let count = 0;
        
        let tile = document.getElementById(chunk_id+'/'+x+','+z);
        if(!this.checkTile(tile,'water')){
            return {x: this.x , z:this.z};
        }else{
            while (x !== 0 || z !== 0) {
                x += directions[directionIndex][0];
                z += directions[directionIndex][1];
    
                let tile = document.getElementById(chunk.id+'/'+x+','+z);
                if(!this.checkTile(tile,'water')){
                    return {x: this.x , z:this.z};
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

    checkTile(tile,type){
        return tile.hasClass(type); 
    }
      
}

class Helper {
    static convertJsonIntoHashMap(json) {
        const hashMap = new Map();
        for (const [key, value] of Object.entries(json)) {
            hashMap.set(key, value);
        }
        return hashMap;
    }


}

function openFile(event) {
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


function readFile(event) {
    console.log("hello");
    openFile(event)
        .then(function(result) {
            console.log("suja");
        })
        .catch(function(error) {
            console.log(error);
        });
}

export default Helper;
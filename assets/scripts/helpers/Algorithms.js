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

class Node {
    constructor(x, y, weight) {
      this.x = x;
      this.y = y;
      this.weight = weight;
      this.g = Infinity;
      this.h = 0;
      this.f = 0;
      this.parent = null;
    }
  
    calculateHeuristic(endNode) {
      // Calculate the Manhattan distance heuristic
      this.h = Math.abs(this.x - endNode.x) + Math.abs(this.y - endNode.y);
    }
  }
  
  function isValidCoordinate(x, y, matrix) {
    return x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length;
  }
  
  export function astar(matrix, start, end) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const openSet = [];
    const closedSet = [];
  
    const startNode = new Node(start[0], start[1], matrix[start[0]][start[1]]);
    const endNode = new Node(end[0], end[1], matrix[end[0]][end[1]]);
  
    startNode.g = 0;
    startNode.calculateHeuristic(endNode);
    startNode.f = startNode.h;
  
    openSet.push(startNode);
  
    while (openSet.length > 0) {
      let currentNode = openSet[0];
      let currentIndex = 0;
  
      // Find node with lowest f value
      openSet.forEach((node, index) => {
        if (node.f < currentNode.f) {
          currentNode = node;
          currentIndex = index;
        }
      });
  
      // If reached the end node
      if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
        const path = [];
        let current = currentNode;
        while (current !== null) {
          path.push([current.x, current.y]);
          current = current.parent;
        }
        return path.reverse();
      }
  
      // Remove current node from open set and add to closed set
      openSet.splice(currentIndex, 1);
      closedSet.push(currentNode);
  
      // Generate neighbors
      const neighbors = [
        [currentNode.x - 1, currentNode.y],
        [currentNode.x + 1, currentNode.y],
        [currentNode.x, currentNode.y - 1],
        [currentNode.x, currentNode.y + 1],
      ];
  
      for (let i = 0; i < neighbors.length; i++) {
        const [x, y] = neighbors[i];
  
        if (isValidCoordinate(x, y, matrix)) {
          const neighbor = new Node(x, y, matrix[x][y]);
  
          if (!closedSet.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
            const tentativeG = currentNode.g + neighbor.weight;
  
            if (tentativeG < neighbor.g) {
              neighbor.parent = currentNode;
              neighbor.g = tentativeG;
              neighbor.calculateHeuristic(endNode);
              neighbor.f = neighbor.g + neighbor.h;
  
              if (!openSet.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                openSet.push(neighbor);
              }
            }
          }
        }
      }
    }
  
    // If no path found
    return null;
  }

function maxCluster(matrix) {
  let maxCounter = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 1) {
        connectedNeighboursCount = countConnectedNeighbours(matrix, row, col);
        maxCounter = Math.max(maxCounter, connectedNeighboursCount);
      }
    }
  }

  return maxCounter;
}

function countConnectedNeighbours(matrix, row, col) {
  if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[0].length)
    return 0;

  if (matrix[row][col] === 0) return 0;

  let neighbourCount = 1;
  matrix[row][col] = 0; //checked

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i !== row || j !== col) {
        neighbourCount += countConnectedNeighbours(matrix, i, j);
      }
    }
  }
  return neighbourCount;
}

export default maxCluster;

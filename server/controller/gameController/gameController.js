// const map = require('./map');
// let playMoves = require('./playMoves');

let map = [
  ['-', '-', '-', 'O', '-', '-', '-', '-', '-', 'O'],
  ['-', 'O', '-', '-', '-', 'O', '-', 'D', '-', '-'],
  ['-', '-', '-', '-', 'O', '-', '-', 'O', '-', '-'],
  ['-', 'O', '-', 'O', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', 'O', '-', 'O', '-', '-'],
  ['F', '-', '-', 'O', '-', '-', '-', '-', '-', 'O'],
  ['-', '-', 'O', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', 'O', '-', '-'],
  ['-', 'O', '-', '-', 'O', 'O', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', 'O', '-']
]

function playMoves (moveList, map, currentPosition = [5, 0]) {
  output = {
    message: "",
    subMessage: "",
    step: 0
  };
  let newPosition = [...currentPosition];
  for(let i = 0; i < moveList.length; i++) {
    if (moveList[i] === "N") {
      newPosition = [newPosition[0]-1, newPosition[1]]
    } else if (moveList[i] === "S") {
      newPosition = [newPosition[0]+1, newPosition[1]]
    } else if (moveList[i] === "E") {
      newPosition = [newPosition[0], newPosition[1]+1]
    } else if (moveList[i] === "W") {
      newPosition = [newPosition[0], newPosition[1]-1]
    }

    if (
        newPosition[0] < 0 ||
        newPosition[0] >= map.length ||
        newPosition[1] < 0 ||
        newPosition[1] >= map[0].length
      ) {
        output = {
          message: "You died: fell off the map",
          subMessage: "Straight into the forest",
          step: i+1
        }
      return output;
    } else if (map[newPosition[0]][newPosition[1]] == 'O') {
      output = {
        message: "You died: Orcs found you",
        subMessage: "Meat's back on the menu boys!",
        step: i+1
      }
      return output;
    } else if (map[newPosition[0]][newPosition[1]] == 'D') {
      output = {
        message: "You Win!!",
        subMessage: "Sauron has been defeated",
        step: i+1
      }
      return output;
    }
  }

  if (map[newPosition[0]][newPosition[1]] === '-') {
    output = {
      message: "You died: didnt get anywhere",
      subMessage: "Master has no more elven bread",
      step: i+1
    }
    return output;
  }

  return output;
}

const userMove = async function (req, res) {
  try {
    console.log(req.body);
    const moveList = req.body.moveList;
    const response = playMoves(moveList, map)
    res.json(response);
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

module.exports = {
  userMove
}
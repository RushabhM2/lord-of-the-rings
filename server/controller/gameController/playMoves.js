function playMoves (moveList, map, currentPosition = [5, 0]) {
  
  // response value schema
  output = {
    message: "",
    subMessage: "",
    position: [...currentPosition],
    status: 0
  };

  let newPosition = [...currentPosition];
  
  // converting each move to coordinate movements
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

    // managing each of the 4 end game cases
    if (
        newPosition[0] < 0 ||
        newPosition[0] >= map.length ||
        newPosition[1] < 0 ||
        newPosition[1] >= map[0].length
      ) {
        output = {
          message: "You fell off the map",
          subMessage: "You have failed the people of Middle Earth",
          position: newPosition,
          status: 1
        }
      return output;
    } else if (map[newPosition[0]][newPosition[1]] == 'O') {
      output = {
        message: "You died: The Orcs found you",
        subMessage: "Meat's back on the menu boys!",
        position: newPosition,
        status: 2
      }
      return output;
    } else if (map[newPosition[0]][newPosition[1]] == 'D') {
      output = {
        message: "You Win!!",
        subMessage: "Sauron has been defeated",
        position: newPosition,
        status: 3
      }
      return output;
    }
  }

  if (map[newPosition[0]][newPosition[1]] === '-') {
    output = {
      message: "Your journey didn't get you anywhere",
      subMessage: "Master has no eaten all the bread",
      position: newPosition,
      status: 4
    }
    return output;
  }

  return output;
}

module.exports = {
  playMoves
}
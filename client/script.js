// const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const BASE_URL = 'http://localhost:3001';

// Requied global variables
let moveList = [];
let coordinateHistory = [];
let currentPosition = [5, 0]

// Setting event listners and page
$( document ).ready(function() {
  $("#instructions").hide()
  
  $("#sendMove").on("click", () => sendMove(moveList));
  $("#restartGame").on("click", () => window.location.reload())
  $("#openInstructions").on("click", () => $("#instructions").show())
  $("#closeInstructions").on("click", () => $("#instructions").hide())

  $(document).on("keyup", userKeyCapture);
  createMap ();

  $(`#${currentPosition[0]}-${currentPosition[1]}`)
  .addClass("currentCell")
})

// API call to backend where game logic is processed
const sendMove = async function (moveList) {
  let winLoseMessage = $("#winLoseMessage")
  let winLoseSubMessage = $("#winLoseSubMessage")
  fetch(`${BASE_URL}/userMove`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      moveList: moveList
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status == 2) {
      $(`#${res.position[0]}-${res.position[1]}`).addClass("orc")
    } else if (res.status == 4) {
      $(`#${res.position[0]}-${res.position[1]}`).addClass("nowhere")
    } else if (res.status == 3) {
      $(`#${res.position[0]}-${res.position[1]}`).addClass("sauron")
      winLoseMessage.addClass("success")
      winLoseSubMessage.addClass("success")
    }
    winLoseMessage.text(res.message);
    winLoseSubMessage.text(res.subMessage);
  })
  .catch(err => console.log(err))
}

// Capturing key presses for directional arrows, N, S, E, W, backspace and enter (which launched API call)
const userKeyCapture = function (event) {
  currentPosition = coordinateHistory[coordinateHistory.length-1] || [5,0];

  if (event.keyCode === 78 || event.keyCode === 38) {
    moveList.push("N");
    coordinateHistory.push([currentPosition[0]-1, currentPosition[1]]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]} &emsp; &rarr; </li>`);
  
  } else if (event.keyCode === 83 || event.keyCode === 40) {
    moveList.push("S");
    coordinateHistory.push([currentPosition[0]+1, currentPosition[1]]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]} &emsp; &rarr; </li>`);
  
  } else if (event.keyCode === 69 || event.keyCode === 39) {
    moveList.push("E");
    coordinateHistory.push([currentPosition[0], currentPosition[1]+1]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]} &emsp; &rarr; </li>`);
  
  } else if (event.keyCode === 87 || event.keyCode === 37) {
    moveList.push("W");
    coordinateHistory.push([currentPosition[0], currentPosition[1]-1]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]} &emsp; &rarr; </li>`);
  
  } else if (event.keyCode === 8) {
    moveList.pop();
    let removedPosition = coordinateHistory.pop();
    $(`#${removedPosition[0]}-${removedPosition[1]}`).removeClass("currentCell").removeClass("previousCell")
    $("#userCaptureDisplay li").last().remove();
  
  } else if (event.keyCode === 13) {
    sendMove(moveList);
  
  }
  
  // Showing where the player has been on grid
  coordinateHistory.forEach((el, i) => {
    if (i === coordinateHistory.length-1) {
      $(`#${el[0]}-${el[1]}`).addClass("currentCell")  
    } else {
      $(`#${el[0]}-${el[1]}`).removeClass("currentCell").addClass("previousCell")
    }
  })
}

// Creating player map with unique ids for each cell
const createMap = function () {
  for (let i=0; i<10; i++) {
    $("#map").append(`<tr></tr>`)
    for (let j=0; j<10; j++) {
      $("#map tr:last").append(`<td id=${i}-${j}></td>`)
    }
  }
}
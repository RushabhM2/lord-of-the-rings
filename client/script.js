// const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const BASE_URL = 'http://localhost:3001';
let moveList = [];
let coordinateHistory = [];
currentPosition = [5, 0]
previousPosition = [...currentPosition]

$( document ).ready(function() {
  $("#sendMove").on("click", ()=>sendMove(moveList));
  $(document).on("keyup", userKeyCapture);
  createMap ();

  $(`#${currentPosition[0]}-${currentPosition[1]}`)
  .addClass("currentCell")
})

const sendMove = async function (movesList) {
  console.log("send move clicked")
  let p = $("#response")
  p.text("hello")
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
  .then(res => p.text(res.message))
  .catch(err => console.log(err))
}

const userKeyCapture = function (event) {
  previousPosition = [...currentPosition];
  $(`#${previousPosition[0]}-${previousPosition[1]}`)
  .removeClass("currentCell")
  .addClass("previousCell")
  
  console.log('prevPos : ', previousPosition);

  if (event.keyCode === 78 || event.keyCode === 38) {
    moveList.push("N");
    coordinateHistory.push([currentPosition[0]-1, currentPosition[1]]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]}</li>`);
  
  } else if (event.keyCode === 83 || event.keyCode === 40) {
    moveList.push("S");
    coordinateHistory.push([currentPosition[0]+1, currentPosition[1]]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]}</li>`);
  
  } else if (event.keyCode === 69 || event.keyCode === 39) {
    moveList.push("E");
    coordinateHistory.push([currentPosition[0], currentPosition[1]+1]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]}</li>`);
  
  } else if (event.keyCode === 87 || event.keyCode === 37) {
    moveList.push("W");
    coordinateHistory.push([currentPosition[0], currentPosition[1]-1]);
    $("#userCaptureDisplay").append(`<li>${moveList[moveList.length-1]}</li>`);
  
  } else if ( event.keyCode === 8) {
    moveList.pop();
    coordinateHistory.pop();
    $("#userCaptureDisplay li").last().remove();
  
  } else if ( event.keyCode === 13) {
    sendMove(moveList);
  
  }
  
  currentPosition = coordinateHistory[moveList.length-1]
  console.log('currPos : ', currentPosition);

  $(`#${currentPosition[0]}-${currentPosition[1]}`)
  .addClass("currentCell")
}

const createMap = function () {
  for (let i=0; i<10; i++) {
    $("#map").append(`<tr></tr>`)
    for (let j=0; j<10; j++) {
      $("#map tr:last").append(`<td id=${i}-${j}>${i}-${j}</td>`)
    }
  }
}
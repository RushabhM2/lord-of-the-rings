// const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const BASE_URL = 'http://localhost:3001';
// let moveList = ["S", "N" ,"N", "E", "E", "E", "E", "N", "E", "E", "N", "N", "E", "E", "N"];
let moveList = [];

$( document ).ready(function() {
  $("#sendMove").on("click", ()=>sendMove(moveList));
  let userCaptureDisplay = $("#userCaptureDisplay")
  // $(document).on("keypress", (event)=>(console.log(String.fromCharCode(event.keyCode))))
  // $(document).on("keyup", (event)=>(console.log(event.keyCode)))
  $(document).on("keyup", userKeyCapture);

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
  if (event.keyCode === 78 || event.keyCode === 38) {
    moveList.push("N")
  } else if (event.keyCode === 83 || event.keyCode === 40) {
    moveList.push("S")
  } else if (event.keyCode === 69 || event.keyCode === 39) {
    moveList.push("E")
  } else if (event.keyCode === 87 || event.keyCode === 37) {
    moveList.push("W")
  } else if ( event.keyCode === 8) {
    moveList.pop();
  }
  
  console.log(moveList)
}
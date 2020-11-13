const { map } = require('./map'); // Holds map array
let { playMoves } = require('./playMoves'); // function to process game logic

const userMove = async function (req, res) {
  try {
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
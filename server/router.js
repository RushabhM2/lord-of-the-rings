const router = require('express').Router();
const gameController = require('./controller/gameController/gameController');

router.post('/userMove', gameController.userMove)

module.exports = router;
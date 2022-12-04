const express = require('express')
const passport = require('passport')

const { boardController } = require('../../controllers')

const router = express.Router()

router.get('/list', boardController.GetBoards)
router.post('/new', passport.authenticate('jwt', { session: false }), boardController.CreateBoard)
router.get('/:id', boardController.GetFullBoard), router.get('/safe/:id', boardController.GetFullBoardSafe)

module.exports = router

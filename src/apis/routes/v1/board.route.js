const express = require('express')

const { boardController } = require('../../controllers')

const router = express.Router()

router.get('/list', boardController.GetBoards)
router.post('/new', boardController.CreateBoard)
router.get('/:id', boardController.GetFullBoard)

module.exports = router

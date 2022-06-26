const express = require('express')

const { cardController } = require('../../controllers')

const router = express.Router()

router.post('/new', cardController.CreateCard)
router.patch('/:id', cardController.UpdateCard)

module.exports = router

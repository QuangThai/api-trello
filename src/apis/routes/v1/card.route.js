const express = require('express')

const { cardController } = require('../../controllers')

const router = express.Router()

router.post('/new', cardController.CreateCard)
router.patch('/:id', cardController.UpdateCard)
router.delete('/:id', cardController.DeleteCard)

module.exports = router

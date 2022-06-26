const express = require('express')

const { columnController } = require('../../controllers')

const router = express.Router()

router.post('/new', columnController.CreateColumn)
router.patch('/:id', columnController.UpdateColumn)

module.exports = router

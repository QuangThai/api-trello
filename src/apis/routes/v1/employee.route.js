const express = require('express')

const { employeeController } = require('../../controllers')

const router = express.Router()


router.post('/new', employeeController.CreateEmployee)

module.exports = router
const express = require('express')

const { companyController } = require('../../controllers')

const router = express.Router()


router.get('/get', companyController.GetCompany)
router.post('/new', companyController.CreateCompany)

module.exports = router
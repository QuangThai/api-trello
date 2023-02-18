const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { companyService } = require('../services')

const CreateCompany = catchAsync(async (req, res) => {
    const company = await companyService.createCompany(req.body)
    res.status(httpStatus.CREATED).send({ company })
})

const GetCompany = catchAsync(async (req, res) => {
    const company = await companyService.getCompany()
    res.status(httpStatus.CREATED).send(company)
})

module.exports = {
  CreateCompany,
  GetCompany
}
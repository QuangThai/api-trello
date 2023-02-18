const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { employeeService } = require('../services')

const CreateEmployee = catchAsync(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body)
    res.status(httpStatus.CREATED).send({ employee })
})

module.exports = {
  CreateEmployee,
}
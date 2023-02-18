const { Employee } = require('../models')


const createEmployee= async (employeeBody) => {
  return Employee.create(employeeBody)
}

module.exports = {
  createEmployee
}

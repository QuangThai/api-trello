const { Company } = require('../models')
const mongoose = require('mongoose')
const { Employee } = require('../models')

const createCompany = async (companyBody) => {
    return Company.create(companyBody)
}

const getCompany = async () => {
    const company = await Company.find({
        active: 'IT',
    })
    const companyIds = company.map((company) => company._id.toString())

    const result = await Employee.aggregate([
        {
            $addFields: {
                year: { $year: '$workStart' },
            },
        },
        {
            $match: {
                $and: [{ companyId: { $in: companyIds } }, { year: { $gte: 2020 } }, { year: { $lte: 2022 } }],
            },
        },
        {
            $group: {
                _id: {
                    companyId: '$companyId',
                    date: '$year',
                },
                total: { $sum: '$salary' },
                totalEmployee: { $sum: 1 },
            },
        },
    ])

    console.log(result)
    return result
}

module.exports = {
    createCompany,
    getCompany,
}

const mongoose = require('mongoose')

const { toJSON, paginate } = require('./plugins')

const employeeSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        workStart: {
            type: Date,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
    },
    {
        timestamps: true,
    }
)

employeeSchema.plugin(toJSON)
employeeSchema.plugin(paginate)

/**
 * @typedef Token
 */
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee

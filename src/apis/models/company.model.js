const mongoose = require('mongoose')

const { toJSON, paginate } = require('./plugins')

const companySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        maxEmployee: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
        },
        active: [String],
        currency: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

companySchema.plugin(toJSON)
companySchema.plugin(paginate)

/**
 * @typedef Token
 */
const Company = mongoose.model('Company', companySchema)

module.exports = Company

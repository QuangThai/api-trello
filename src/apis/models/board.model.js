const mongoose = require('mongoose')

const { toJSON, paginate } = require('./plugins')

const boardSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        columnOrder: {
            type: Array,
        },
        _destroy: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

boardSchema.index({ title: 'text' })
boardSchema.plugin(toJSON)
boardSchema.plugin(paginate)

/**
 * @typedef Token
 */
const Board = mongoose.model('Board', boardSchema)

module.exports = Board

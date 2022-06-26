const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const boardSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        columnOrder: {
            type: Array,
        },
        dueDate: {
            type: Number,
            required: false,
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

boardSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Board = mongoose.model('Board', boardSchema)

module.exports = Board

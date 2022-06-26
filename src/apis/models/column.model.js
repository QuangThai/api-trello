const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const columnSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        boardId: {
            type: String,
            required: true,
        },
        cardOrder: {
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

columnSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Column = mongoose.model('Column', columnSchema)

module.exports = Column

const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const cardSchema = mongoose.Schema(
    {
        boardId: {
            type: String,
            required: true,
        },
        columnId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            default: null,
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

cardSchema.plugin(toJSON)

/**
 * @typedef Token
 */
const Card = mongoose.model('Card', cardSchema)

module.exports = Card

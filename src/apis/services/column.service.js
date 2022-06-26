const { Column } = require('../models')
const mongoose = require('mongoose')
const { boardService } = require('../services')

/**
 * Create a task
 * @param {Object} columnBody
 * @returns {Promise<Task>}
 */

const createColumn = async (columnBody) => {
    const newColumn = await Column.create(columnBody)
    // update column order
    const { boardId, _id: columnId } = newColumn
    await boardService.pushColumnOrder(boardId.toString(), columnId.toString())
    return newColumn
}

const updateColumn = async (id, columnBody) => {
    const column = await Column.findOne({ _id: id })

    Object.keys(columnBody).forEach((key) => {
        column[key] = columnBody[key]
    })
    await column.save()

    return column
}

/**
 *
 * @param {string} columnId
 * @param {string} cardId
 * @returns
 */
const pushCardOrder = async (columnId, cardId) => {
    const result = await Column.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnOriginal: false }
    )
    return result.value
}

module.exports = {
    createColumn,
    updateColumn,
    pushCardOrder,
}

const { Board } = require('../models')
const mongoose = require('mongoose')

/**
 * Create a task
 * @param {Object} boardBody
 * @returns {Promise<Task>}
 */
const createBoard = async (boardBody) => {
    return Board.create(boardBody)
}

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
    const result = await Board.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnOriginal: false }
    )
    return result.value
}

const getBoards = async () => {
    const result = await Board.find({}).sort({ dueDate: -1 }).lean()
    return result
}

const getFullBoard = async (id) => {
    const board = await Board.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        { $addFields: { _id: { $toString: '$_id' } } },
        { $lookup: { from: 'columns', localField: '_id', foreignField: 'boardId', as: 'columns' } },
        { $lookup: { from: 'cards', localField: '_id', foreignField: 'boardId', as: 'cards' } },
    ])
    return board[0] || {}
}

module.exports = {
    createBoard,
    getFullBoard,
    pushColumnOrder,
    getBoards,
}

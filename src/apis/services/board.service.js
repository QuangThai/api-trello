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

const getBoards = async (options) => {
    let filter = {}
    if (options.search) {
        filter = {
            $text: { $search: options.search },
            // title: { $regex: options.search, $options: 'i' },
        }
    }
    const result = await Board.paginate(filter, options)
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

const getFullBoardSafe = async (id) => {
    const board = await Board.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(id) },
        },
        {
            $addFields: { boardId: { $toString: '$_id' } }, // add field boardId convert to _id to string is of table boards
        },
        {
            $lookup: {
                from: 'columns',
                as: 'columns',
                let: { boardId: '$boardId' }, // get boardId: string is of table boards
                pipeline: [
                    {
                        $match: {
                            $expr: { $and: [{ $eq: ['$boardId', '$$boardId'] }] }, //  $boardId is of table columns
                        },
                    },
                    {
                        $addFields: { columnId: { $toString: '$_id' } }, // add field columnId convert _id to string is of table columns
                    },
                    {
                        $lookup: {
                            from: 'cards',
                            as: 'cards',
                            let: { columnId: '$columnId' }, // get boardId: string is of table column
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $and: [{ $eq: ['$columnId', '$$columnId'] }] }, //  $columnId is of table cards
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ])
    return board[0] || {}
}

module.exports = {
    createBoard,
    getFullBoard,
    pushColumnOrder,
    getBoards,
    getFullBoardSafe,
}

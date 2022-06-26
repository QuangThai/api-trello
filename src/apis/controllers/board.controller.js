const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { boardService } = require('../services')

const CreateBoard = catchAsync(async (req, res) => {
    const board = await boardService.createBoard(req.body)
    res.status(httpStatus.CREATED).send(board)
})

const GetFullBoard = catchAsync(async (req, res) => {
    const board = await boardService.getFullBoard(req.params.id)
    board.columns.forEach((column) => {
        column.cards = board.cards.filter((card) => card.columnId.toString() === column._id.toString())
    })
    delete board.cards
    // remove card
    res.status(httpStatus.CREATED).send(board)
})

const GetBoards = catchAsync(async (req, res) => {
    const boards = await boardService.getBoards()
    res.status(httpStatus.OK).send(boards)
})

module.exports = {
    CreateBoard,
    GetFullBoard,
    GetBoards,
}

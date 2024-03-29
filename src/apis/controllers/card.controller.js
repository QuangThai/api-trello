const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { cardService } = require('../services')

const CreateCard = catchAsync(async (req, res) => {
    const card = await cardService.createCard(req.body)
    res.status(httpStatus.CREATED).send({ card })
})

const UpdateCard = catchAsync(async (req, res) => {
    const card = await cardService.updateCard(req.params.id, req.body)
    res.status(httpStatus.OK).send({ card })
})

const DeleteCard = catchAsync(async (req, res) => {
    const card = await cardService.deleteCard(req.params.id)
    res.status(httpStatus.OK).send({ success: 200, card })
})

module.exports = {
    CreateCard,
    UpdateCard,
    DeleteCard,
}

const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { columnService } = require('../services')

const CreateColumn = catchAsync(async (req, res) => {
    const column = await columnService.createColumn(req.body)
    res.status(httpStatus.CREATED).send({ column })
})

const UpdateColumn = catchAsync(async (req, res) => {
    const column = await columnService.updateColumn(req.params.id, req.body)
    res.status(httpStatus.OK).send({ column })
})

module.exports = {
    CreateColumn,
    UpdateColumn,
}

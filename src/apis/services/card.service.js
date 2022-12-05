const { Card, Column } = require('../models')
const { columnService } = require('../services')
const ObjectId = require('mongoose').Types.ObjectId

/**
 * Create a card
 * @param {Object} cardBody
 * @returns {Promise<Task>}
 */
const createCard = async (cardBody) => {
    const newCard = await Card.create(cardBody)
    const { columnId, _id: cardId } = newCard
    await columnService.pushCardOrder(columnId.toString(), cardId.toString())
    return newCard
}

const updateCard = async (id, cardBody) => {
    const card = await Card.findOne({ _id: id })

    Object.keys(cardBody).forEach((key) => {
        card[key] = cardBody[key]
    })
    await card.save()

    return card
}

const deleteCard = async (cardId) => {
    // get card current
    const card = await Card.findById(new ObjectId(cardId))
    if (card) {
        // get column by card
        const { columnId } = card

        const column = await Column.findById(ObjectId(columnId))
        // remove card
        await card.remove()
        // remove cardId by cardOrder in column
        column.cardOrder.pull(card._id.toString())
        await column.save()
    } else {
        throw new Error('Card not found')
    }
}

module.exports = {
    createCard,
    updateCard,
    deleteCard,
}

const { Card } = require('../models')
const { columnService }  = require('../services')

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

module.exports = {
    createCard,
    updateCard,
}

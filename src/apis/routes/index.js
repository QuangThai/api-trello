const express = require('express')

const authRoute = require('./v1/auth.route')
const taskRoute = require('./v1/task.route')
const userRoute = require('./v1/user.route')
const boardRoute = require('./v1/board.route')
const columnRoute = require('./v1/column.route')
const cardRoute = require('./v1/card.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/auth',
        route: authRoute,
    },
    {
        path: '/v1/tasks',
        route: taskRoute,
    },
    {
        path: '/v1/users',
        route: userRoute,
    },
    {
        path: '/v1/boards',
        route: boardRoute,
    },
    {
        path: '/v1/columns',
        route: columnRoute,
    },
    {
        path: '/v1/cards',
        route: cardRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router

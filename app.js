const express = require("express");
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express')
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./swagger.yaml')
//const cacheControlMiddleware = require('./middleware/cacheControlMiddleware')

const app = express()
//Regular middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookies and file middleware
app.use(cookieParser())
app.use(fileUpload())

//Middlewares
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(function (req, res, next) {
 //   res.set('Cache-control', 'public, max-age=300')
    res.set("Connection", "keep-alive")
    res.set("Content-Type", "text/event-stream")
    res.set("Cache-Control", "no-store, no-transform")
    res.set("X-Accel-Buffering", "no")
    res.set("Speak-of-the-devil", "I was just thinking about you!")
    next()
})

//Import all routes
const userRouter = require('./routes/userRouter')
const eventRouter = require('./routes/eventRouter')

//router middleware
app.use('/api/v1/users', userRouter);
app.use('/api/v1/event', eventRouter);


module.exports = app;

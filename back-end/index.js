const config = require('./common/config/env.config.js')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mainRouter = require('./routes/main')
const authorizationRouter = require('./routes/authx.routes')
const usersRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')

const dbConnect = require('./common/services/mongoose.service').connectWithRetry

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header(
        'Access-Control-Allow-Headers',
        'Accept, Authorization, Content-Type, X-Requested-With, Range'
    )
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    } else {
        return next()
    }
})

app.use(bodyParser.json())
authorizationRouter.routesConfig(app)
usersRouter.routesConfig(app)
productRouter.routesConfig(app)

app.use('/api', mainRouter)

dbConnect();

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port)
})

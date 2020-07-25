const UsersController = require('./users.controller')

const jwtSecret = require('../common/config/env.config').jwt_secret;
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    console.log('Logging in')
    try {
        let token = jwt.sign(req.body, jwtSecret)
        res.status(200).send({ accessToken: token })
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}

exports.register = (req, res) => {
    UsersController.insert(req, res);
}

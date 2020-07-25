const VerifyUserMiddleware = require('../middlewares/verify.middleware');
const AuthorizationController = require('../controllers/authorization.controller');
const AuthValidationMiddleware = require('../middlewares/authx.middleware');

exports.routesConfig = function (app) {

    app.post('/login', [
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/register', [
        VerifyUserMiddleware.hasRegisterValidFields,
        AuthorizationController.register
    ]);
};
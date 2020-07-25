const UsersController = require('../controllers/users.controller');
const AuthXMiddleware = require('../middlewares/authx.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/api/users', [
        UsersController.insert
    ]);
    app.get('/api/users', [
        AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get('/api/users/:userId', [
        AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(FREE),
        // AuthXMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/api/users/:userId', [
        AuthXMiddleware.validJWTNeeded,
        AuthXMiddleware.minimumPermissionLevelRequired(FREE),
        AuthXMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/api/users/:userId', [
        AuthXMiddleware.validJWTNeeded,
        AuthXMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};

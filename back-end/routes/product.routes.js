const ProductController = require('../controllers/products.controller');
const AuthXMiddleware = require('../middlewares/authx.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/api/products', [
        ProductController.index
    ]);
    app.post('/api/products', [
        AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(FREE),
        // AuthXMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProductController.create
    ]);
    app.post('/api/products/search', [
        // AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductController.filterProductsByTextInput
    ]);
    app.get('/api/products/:id', [
        // AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(PAID),
        ProductController.show
    ]);

    app.patch('/api/products/:id', [
        AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(FREE),
        // AuthXMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProductController.patchById
    ]);
    app.delete('/api/products/:id', [
        AuthXMiddleware.validJWTNeeded,
        // AuthXMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProductController.removeById
    ]);
};

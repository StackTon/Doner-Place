const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/order-status', controllers.order.status);
    app.post('/order-status', controllers.admin.changeOrder);

    app.get('/createProduct',restrictedPages.isAdmin(), controllers.admin.createProduct.get);
    app.post('/createProduct',restrictedPages.isAdmin(), controllers.admin.createProduct.post);

    app.get('/order/:productId', controllers.order.order.get)
    app.post('/order/:productId', controllers.order.order.post)

    app.get('/order-detail/:orderId', controllers.order.orderDerail);

    app.get('/edit/:prodictId',restrictedPages.isAdmin(), controllers.admin.edit.get);
    app.post('/edit/:prodictId',restrictedPages.isAdmin(), controllers.admin.edit.post);
    app.get('/delete/:prodictId',restrictedPages.isAdmin(), controllers.admin.delete);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
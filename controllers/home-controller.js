const Product = require('mongoose').model('Product');

module.exports = {
    index: (req, res) => {
        Product.find({}).then(products => {
            let chicken = []
            let beef = []
            let lamb = []
            for (let product of products) {   
                if (product.category === 'chicken') {
                    chicken.push(product)
                }
                else if (product.category === 'beef') {
                    beef.push(product)
                }
                else if (product.category === 'lamb') {
                    lamb.push(product)
                }
            }
            if (req.user) {
                if (req.user.isAdmin) {
                    res.render('admin/home', {chicken, beef, lamb});
                }
                else {
                    res.render('home/index', {chicken, beef, lamb});
                }
            }
            else {
                res.render('home/index', {chicken, beef, lamb});
            }

        })

    },
    about: (req, res) => {
        res.render('home/about');
    }
}
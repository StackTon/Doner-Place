const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');

module.exports = {
  createProduct: {
    get: (req, res) => {
      res.render('admin/add')
    },
    post: (req, res) => {
      let productBody = req.body;
      if(productBody.category === '' || productBody.imageUrl === '' || productBody.size === ''){
        res.locals.globalError = 'Pleace fill the inputs';
        res.render('admin/add');
        return;
      }
      if(productBody.size < 17 || productBody.size > 24){
        res.locals.globalError = 'Size must be between 17 and 24';
        res.render('admin/add');
        return;
      }
      let toppings = productBody.toppings.split(',')

      let productObj = {
        category: productBody.category,
        size: productBody.size,
        image: productBody.imageUrl,
        toppings: toppings,
        creationDate: Date.now(),
        user: req.user._id
      }

      Product.create(productObj).then(() => {
        res.redirect('/')
      })
    }
  },
  changeOrder: (req, res) => {
    if(!req.user){
      res.redirect('/login')
      return;
    }


    for (let orderId in req.body) {
      Order.findById(orderId).then(order => {
        if (req.body[orderId] !== order.status) {
          order.status = req.body[orderId]
          order.save();
        }
      })
    }
    res.redirect('/order-status');
  },
  edit: {
    get: (req, res) => {
      let prodictId = req.params.prodictId;
      Product.findById(prodictId).then(foundProduct => {
        let categories = ['beef', 'chicken', 'lamb'];
        let index = categories.indexOf(foundProduct.category);
        let ctg = categories[index];
        categories.splice(index, 1);
        categories.unshift(ctg);

        res.render('admin/edit', { product: foundProduct, categories })
      })

    },
    post: (req, res) => {

      let prodictId = req.params.prodictId;
      let productBody = req.body;
      if(productBody.category === '' || productBody.imageUrl === '' || productBody.size === ''){
        res.locals.globalError = 'Pleace fill the inputs';
        Product.findById(prodictId).then(foundProduct => {
          let categories = ['beef', 'chicken', 'lamb'];
          let index = categories.indexOf(foundProduct.category);
          let ctg = categories[index];
          categories.splice(index, 1);
          categories.unshift(ctg);
  
          res.render('admin/edit', { product: foundProduct, categories })
        })
        return;
      }
      Product.findById(prodictId).then(foundProduct => {
        let toppings = productBody.toppings.split(',');
        foundProduct.category = productBody.category;
        foundProduct.image = productBody.imageUrl;
        foundProduct.size = productBody.size;
        foundProduct.toppings = toppings;
        foundProduct.save().then(() => {
          res.redirect('/')
        })
      })
    }
  },
  delete: (req, res) => {
    let prodictId = req.params.prodictId;
    Product.findByIdAndRemove(prodictId).then(() => {
      res.redirect('/')
    })
  }
}
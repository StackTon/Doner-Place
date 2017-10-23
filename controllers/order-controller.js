const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');

module.exports = {
  status: (req, res) => {
    if(!req.user){
      res.redirect('/login')
      return;
    }

    Order.find({ creator: req.user._id }).populate('product').then(orders => {
      for (let i = 0; i < orders.length; i++) {
        let day = orders[i].creationDate.getDate();
        let month = orders[i].creationDate.getMonth(); + 1;
        let year = orders[i].creationDate.getFullYear();
        let hours = orders[i].creationDate.getHours();
        let minutes = orders[i].creationDate.getMinutes()
        let date = day + '.' + month + ' ' + year + ' ' + hours + ':' + minutes
        orders[i].date = date;
      }
      if (req.user) {
        if (req.user.isAdmin) {
            Order.find({}).populate('product').then(allOrders => {
              for (let i = 0; i < allOrders.length; i++) {
                let day = allOrders[i].creationDate.getDate();
                let month = allOrders[i].creationDate.getMonth(); + 1;
                let year = allOrders[i].creationDate.getFullYear();
                let hours = allOrders[i].creationDate.getHours();
                let minutes = allOrders[i].creationDate.getMinutes()
                let date = day + '.' + month + ' ' + year + ' ' + hours + ':' + minutes
                allOrders[i].date = date;
                allOrders[i][allOrders[i].status] = allOrders[i].status
              }
            
              res.render('admin/order', {allOrders});
            })
            
        }
        else {
          res.render('order/status', { orders })
        }
    }
    else {
      res.render('order/status', { orders })
    }

     

    })

  },
  order: {
    get: (req, res) => {
      if(!req.user){
        res.redirect('/login')
        return;
      }  
      let productId = req.params.productId;
      Product.findById(productId).then(product => {
        res.render('order/order', { product });
      })

    },
    post: (req, res) => {
      if(!req.user){
        res.redirect('/login')
        return;
      }
  
      let productId = req.params.productId;
      let toppings = [];
      for (let toppic in req.body) {
        toppings.push(toppic);
      }

      let orderObj = {
        creator: req.user._id,
        product: productId,
        creationDate: Date.now(),
        toppings: toppings,
      }

      Order.create(orderObj).then(createdOrder => {
        res.redirect('/order-detail/' + createdOrder._id);
      })
    }
  },
  orderDerail: (req, res) => {
    if(!req.user){
      res.redirect('/login')
    }

    let orderId = req.params.orderId;

    Order.findById(orderId).populate('product').then(order => {

      let day = order.creationDate.getDate();
      let month = order.creationDate.getMonth(); + 1;
      let year = order.creationDate.getFullYear();
      let hours = order.creationDate.getHours();
      let minutes = order.creationDate.getMinutes()
      let date = day + '.' + month + ' ' + year + ' ' + hours + ':' + minutes
      order.date = date;
      order[order.status] = order.status
      res.render('order/details', {order})
    })
  }
}
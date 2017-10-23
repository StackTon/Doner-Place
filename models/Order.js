const mongoose = require('mongoose')

const orderSchema = ({
  creator: {type: mongoose.Schema.Types.ObjectId, required: true},
  product : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
  creationDate: {type: Date, required: true},
  toppings: [{type: String}],
  status: {type: String, default: "pending"}
});

module.exports = mongoose.model('Order', orderSchema);
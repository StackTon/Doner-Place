const  mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: {type: String, required: true,},
  size: {type: Number, max:24, min: 17, required: true},
  image: {type: String, required: true},
  toppings: [{type: String}],
  creationDate: {type: Date, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Product', productSchema);
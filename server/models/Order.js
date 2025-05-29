const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  coffeeType: {
    type: String,
    required: true,
    enum: ['Arabica', 'Espresso', 'Blend Aztek', 'Cappuccino'], // From your Form.jsx
  },
  roast: {
    type: String,
    required: true,
    enum: ['Light Roast', 'Medium Roast', 'Dark Roast'], // From your Form.jsx
  },
  additionalNotes: { type: String },
  orderDate: { type: Date, default: Date.now },
  isFulfilled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);
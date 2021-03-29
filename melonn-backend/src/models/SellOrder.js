const mongoose = require('mongoose')

const SellOrderSchema = new mongoose.Schema({
    sellerStore: String,
    shippingMethod: String,
    externalOrderNumber: String,
    buyerFullName: String,
    buyerPhoneNumber: String, 
    buyerEmail: String,
    shippingAddress: String,
    shippingCity: String,
    shippingRegion: String,
    shippingCountry: String,
    internalOrderNumber: String,
    lineItems: [],
    pack_promise_min: String,
    pack_promise_max: String,
    ship_promise_min: String,
    ship_promise_max: String,
    delivery_pickup_promise_min: String,
    delivery_pickup_promise_max: String,
    ready_pickup_promise_min: String,
    ready_pickup_promise_max: String,
}, {
    timestamps: true,
    versionKey: false
})

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });

module.exports = mongoose.model('SellOrder', SellOrderSchema)
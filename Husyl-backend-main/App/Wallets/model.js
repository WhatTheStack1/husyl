const mongoose = require('mongoose')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Schema = mongoose.Schema

const Wallet = new Schema({
    customerId: {
        type: String,
        required: true
    },
    customer: {
        type: Object
    },
    balance: {
        type: String
    }
})

const autoRetrieveCustomer = async function (doc) {
    const customer = await stripe.customers.retrieve(doc.customerId);
    doc.customer = customer;
}

Wallet
    .post('find', autoRetrieveCustomer)
    .post('findOne', autoRetrieveCustomer)

module.exports = mongoose.model("Wallet", Wallet)
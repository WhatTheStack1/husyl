const WalletModel = require('./model');

const environment = require('dotenv');
environment.config()

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY


const stripe = require('stripe')(stripeSecretKey);

module.exports = {
    Create: async (req, res) => {
        try {
            const customer = await stripe.customers.create({
                description: 'My First Test Customer (created for API docs)',
            });

            const wallet = await WalletModel.create({
                customerId: customer.id,
                balance: customer.balance
            })
            if (!wallet) {
                return res.status(409).json({
                    status: "Failed",
                    message: "Unable to create wallet"
                })
            } else {
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully created Wallet",
                    data: wallet
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    },
    Read: async (req, res) => {
        try {
            const id = req.params.id
            const wallet = await WalletModel.findOne({ _id: id })
            if (!wallet) {
                return res.status(409).json({
                    status: "Failed",
                    message: "Unable to fetch wallet"
                })
            } else {
                return res.status(200).json({
                    status: "Successfull",
                    message: "Successfully fetched Wallet",
                    data: wallet
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            })
        }
    }
}
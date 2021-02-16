const User = require('../Users/model');
const stripe = require('../../Functions/stripe');
const Applications = require('../Applications/model');

module.exports = {
    OpenJobPosting: async (req, res) => {
        try {
            const token = await stripe.createToken(req.body);
            if (token) {
                const chargeObject = {
                    amount: 2000,
                    currency: 'usd',
                    source: token.id,
                    description: `Amount charged for opening job posting for user ${req.decoded._id}.`
                }
                const stripeCharge = await stripe.chargeAmount(chargeObject)
                await User.updateOne({ _id: req.decoded._id }, {
                    $set: {
                        allowedToPostJob: true
                    }
                })
                const user = await User.findOne({ _id: req.decoded._id }, { password: 0 });
                return res.status(200).json({
                    status: "Successful",
                    message: "You are now allowed to post Job.",
                    data: user
                });
            }
            else {
                return res.status(401).json({
                    status: "Failed",
                    message: "Kindly try again! failed to check verify your card."
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    },
    ChargeGivers: async (req, res) => {
        try {
            const token = stripe.createToken(req.body.card);
            if (token) {
                let { amount } = req.body;
                amount = parseFloat(amount) * 100;
                amount = amount.toFixed(0);
                const chargeObject = {
                    amount: amount,
                    currency: 'usd',
                    source: token,
                    description: `Amount charged for opening job posting for user ${req.decoded._id}.`
                }
                if (chargeObject) {
                    await Applications.updateOne({ _id: req.params.applicationId }, {
                        $set: {
                            status: Paid
                        }
                    })

                    return res.status(200).json({
                        status: "Successful",
                        message: "You are now allowed to post Job."
                    });
                } else {
                    return res.status(401).json({
                        status: 'Failed',
                        message: 'Failed to transfer money. Kindly try Again.'
                    })
                }
            }
            else {
                return res.status(401).json({
                    status: "Failed",
                    message: "Kindly try again! failed to check verify your card."
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}
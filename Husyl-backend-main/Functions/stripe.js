const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const createToken = async (cardObject) => {
    return stripe.tokens.create({
        card: cardObject
    });
}

const chargeAmount = async (chargeObject) => {
    return stripe.charges.create(chargeObject);
}

module.exports = {
    createToken,
    chargeAmount
}
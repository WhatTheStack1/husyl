const applications = require('./Applications/routes');
const chats = require('./Chats/routes');
const jobs = require('./Jobs/routes');
const messages = require('./Messages/routes');
const users = require('./Users/routes');
const wallet = require('./Wallets/routes');
const jobGiver = require('./JobGiver/routes');
const jobSeeker = require('./JobSeeker/routes');
const payment = require('./Payments/routes');

module.exports = {
    applications,
    chats,
    jobs,
    messages,
    users,
    wallet,
    jobGiver,
    jobSeeker,
    payment
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Application = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['Applied', 'Approved', 'Paid']
    }
})

const autoPopulate = function (next) {
    this.populate('job');
    this.populate('applicant');
    next();
}

Application
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)

module.exports = mongoose.model("Application", Application)
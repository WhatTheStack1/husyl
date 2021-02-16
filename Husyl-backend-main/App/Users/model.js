const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;


const User = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    zipCode: {
        type: String,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    changePasswordCode: {
        type: String,
        trim: true
    },
    authType: {
        type: String,
        trim: true
    },
    userType: {
        type: String,
        enum: ["Employer", "Employee"]
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    jobSeeker: {
        type: Schema.Types.ObjectId,
        ref: "JobSeeker"
    },
    jobGiver: {
        type: Schema.Types.ObjectId,
        ref: "JobGiver"
    },
    role: {
        type: String,
        enum: ['Giver', 'Seeker']
    },
    allowedToPostJob: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

User.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

User.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

const autoPopulate = function (next) {
    this.populate('wallet');
    this.populate('jobSeeker');
    this.populate('jobGiver');
    next();
}

User
    .pre('findOne', autoPopulate)
    .pre('find', autoPopulate)

module.exports = mongoose.model("User", User);

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSeeker = new Schema({
    officialIdentity: {
        type: String,
        unique: true
    },
    state: {
        type: String,
        trim: true
    },
    biography: {
        type: String,
        trim: true
    },
    languages: [{
        type: String,
        trim: true
    }],
    priority: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    preference: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        trim: true
    },
    jobType: {
        type: String,
        enum: ["Full Time", "Part Time", "Contractual", "Project Based", "Hourly", "Monthly"],
        default: null
    },
    category: {
        type: String
    },
    skills: [{
        type: String,
        trim: true,
    }],
    finance: {
        low: {
            type: Number
        },
        high: {
            type: Number
        }
    },
    avatar: {
        type: String,
        trim: true
    }
})

const autoPopulate = function (next) {
    next();
}

JobSeeker
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)

module.exports = mongoose.model("JobSeeker", JobSeeker)
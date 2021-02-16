const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Job = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        trim: true
    },
    giverType: {
        type: String,
        enum: ['individual', 'company']
    },
    lowerWage: {
        type: Number
    },
    upperWage: {
        type: Number
    },
    estimatedTotalWage: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    dates: [{
        type: Date
    }],
    jobType: {
        type: String,
        enum: ['Part Time', 'Full Time']
    },
    // startingTime: {
    //     type: Date,
    //     required: true
    // },
    // endingTime: {
    //     type: Date,
    //     required: true
    // },
    requirements: [{
        type: String,
        trim: true
    }
    ],
    policies: {
        type: String,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            longitude: Number,
            latitude: Number
        },
        address: {
            type: String,
            trim: true
        }
    },
    status: {
        type: String,
        enum: ['Live', 'Completed', 'Ongoing', 'Deleted'],
        default: 'Live'
    },
    applicants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    salaryType: {
        type: String,
        enum: ['hourly', 'monthly']
    },
    approvedUsers: [{
        type: String,
        trim: true
    }],
    tips: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        trim: true
    },
    hoursToWork: {
        type: Number
    }
}, { timestamps: true })

Job.index({
    category: 'text',
    description: 'text',
}, {
    weights: {
        category: 5,
        description: 1,
    },
});

const autoPopulate = function (next) {
    this.populate('user')
    this.populate('applicants');
    next();
}

Job
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)

module.exports = mongoose.model("Job", Job)
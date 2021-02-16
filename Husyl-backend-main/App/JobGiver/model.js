const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobGiver = new Schema({
    giverType: {
        type: String,
        trim: true,
        enum: ['company', 'individual'],
        required: true
    },
    avatar: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        coordinates: {
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            }
        },
        address: {
            type: String,
            trim: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("JobGiver", JobGiver);

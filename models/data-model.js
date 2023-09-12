// Inserting mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Created Schematic to save in the Database
const dataScheme = new Schema({
    name: {
        type: String,
        required: true,
    },
    educationUsage: {
        type: Number,
        default: 0,
        required: false,
    },
    shoppingUsage: {
        type: Number,
        default: 0,
        required: false,
    },
    browsingUsage: {
        type: Number,
        default: 0,
        required: false,
    },
    socialUsage: {
        type: Number,
        default: 0,
        required: false,
    }
}, {
    timestamps: true
});

const dataModel = mongoose.model('entered-usage', dataScheme);

module.exports = dataModel;
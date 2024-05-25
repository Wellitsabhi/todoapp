const mongoose = require('mongoose')

const appSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {timestamps: true})

const App = mongoose.model('app', appSchema)
module.exports = App
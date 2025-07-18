const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    path:{
        type: String,
        required: [true, 'Path is required']
    },
    originalName:{
        type: String,
        required: [true, 'Original Name is required']
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    }
})

const file = mongoose.model('files', fileSchema)

module.exports = file
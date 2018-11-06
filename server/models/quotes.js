const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a schema for Users (UserSchema)
const QuoteSchema = new Schema({
    author: { 
        type: String, 
        required: [true, 'A name is required'], 
        minlength: 3, 
        trim: true 
    },
    quote: { 
        type: String, 
        required: [true, 'A quote is required'], 
        maxlength: 255 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Quote', QuoteSchema);
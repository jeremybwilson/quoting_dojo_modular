const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a schema for Users (UserSchema)
const QuoteSchema = new mongoose.Schema({
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

// mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
// const Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'Quote'
module.exports = mongoose.model('Quote', 'QuoteSchema');
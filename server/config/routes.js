const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote')

module.exports = function(app){
    app.get('/', function (request, response) {
        Quote.find({}, function (err, data){
            ...
        })
    })
    // all other routes
}
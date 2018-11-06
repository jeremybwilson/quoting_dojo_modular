const QuoteController = require('../controllers/quotes');

module.exports = function(app){
    // routing
    console.log('inside the routes file');

    app.get('/', QuoteController.index);
    app.get('/quotes', QuoteController.new);
    // Add New Quote Request 
    // When the user presses the submit button on index.ejs it should send a post request to '/quotes'.
    // In this route we should add the quote to the database and then redirect to the root route (index view)
    app.post('/quotes', QuoteController.create);
    app.get('/quotes/:_id', QuoteController.show);
    app.get('/quotes/edit/:_id', QuoteController.edit);
    app.post('/quotes/update/:_id', QuoteController.update);
    app.get('/quotes/delete/:_id', QuoteController.destroy);

    // catch 404 and forward to error handler
    app.use((request, response, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use((err, request, response, next) => {
        // set locals, only providing error in development
        response.locals.message = err.message;
        response.locals.error = request.app.get('env') === 'development' ? err : {};
        response.status(err.status || 500);
        // render the error page
        response.render('error', {title: 'Error page'});
    });
};
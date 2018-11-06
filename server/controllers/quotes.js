const Quote = require('mongoose').model('Quote');

module.exports = {
    index(request, response){
        console.log('getting to index');
        response.render('index', {title: 'Quoting Dojo'})
    },

    new(request, response){
        // This is where we will retrieve the users from the database 
        // and include them in the view page we will be rendering.
        Quote.find({})
            .then((quoting_dojo) => {
                const quotes = quoting_dojo;
                console.log('successfully retrieved all quotes in the /quotes route');
                // console.log(quoting_dojo);
                // response.render('user', {user});
                response.render('quotes', {quotes, title: 'All Quotes' })
            })
            // if there is an error console.log that something went wrong!
            .catch(error => {
                console.log(`something went wrong`);
                for (let key in error.errors) {
                    request.flash('get_error', error.errors[key].message)
                    console.log(error.errors[key].message);
                }
            });
    },

    create(request, response){
        console.log("POST DATA", request.body);
        // This is where we would add the user from req.body to the database.
        // create a new Quote with the name and quote corresponding to those from request.body
        Quote.create(request.body)
            .then(quote => {
                console.log(`successfully created a quote! ${quote}`);
                response.redirect('/quotes');
            })
            .catch(error => {
                for (let key in error.errors) {
                    request.flash('create_error', error.errors[key].message);
                }
                console.log(`something went wrong in this /quotes route`);
                response.redirect('/');
            });
    },

    show(request, response){
        const which = request.params._id;
        Quote.find({_id:which})
            .then((quoting_dojo) => {
                quotes = quoting_dojo;
                // console.log('quotes: ', quotes);
                response.render('view', {quote, title: 'Quote page'});
                // console.log('passed the response.render');
            })
            // if there is an error console.log that something went wrong!
            .catch(error => {
                console.log('something went wrong in the individual quotes route');
                for (let key in error.errors) {
                    request.flash('get_error', error.errors[key].message)
                    console.log(error.errors[key].message);
                }
                response.redirect('/quotes');
            });
    },

    // edit (get) quote route
    edit(request, response){
        const which = request.params._id;
        Quote.findById({_id:which})
        .populate('quotes')
        .then(quote => {
            console.log(quote);
            response.render('edit', { quote, title: 'Edit page' });
        })
        .catch(error => {
            console.log(error);
            response.redirect(`/`);
        })
    },

    // update (post) quote route
    update(request, response){
        const which = request.params._id;
        Quote.findByIdAndUpdate(which, request.body)
        .then(() => {
            console.log(quote);
            response.redirect('/quotes/new');
        })
        .catch(error => {
            console.log(error);
            response.redirect(`/quotes/edit/${which}`)
        })
    },

    // delete quote route
    destroy(request, response){
        const which = request.params._id;
        Quote.remove({_id:which})
            .then(() => {
                console.log('deleted successfully')
                response.redirect('/');
            })
            .catch((error) => {
                console.log(error)
                response.redirect('/');
            });
    }
};
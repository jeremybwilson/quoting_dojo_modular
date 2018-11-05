const express = require('express'),
    session = require('express-session'),
    flash = require('express-flash'),
    parser = require('body-parser'),
    path = require('path'),
    
    port = process.env.PORT || 9000,
    // invoke express and store the result in the variable app
    app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(flash());  // for flashing error messaging to the user

const sessionConfig = {
    secret: 'superSekretKitteh',
    resave: false,
    name: 'session',
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};
app.use(session(sessionConfig));

require('./server/config/database');
require('./server/config/routes')(app);

// const server = app.listen(9000);
app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way
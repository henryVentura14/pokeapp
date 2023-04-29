const express = require("express");
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const { request } = require("http");
const { Result } = require("express-validator");
const { nextTick } = require("process");

//initaliation
const app = express();

//setting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    patialsdDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global variables
app.use((request, response, next) => {
    next();
});

//routes
app.use(require('./routes/'));
app.use(require('./routes/authetication'));
app.use(('links'),require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')))

// starting server
app.listen(app.get('port'), () => {
    console.log('server on', app.get('port'))
});
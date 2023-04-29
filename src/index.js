const express = require("express")
const morgan = require('morgan')

//initaliation
const app = express();

//setting
app.set('port', process.env.POR || 4000)

//middleware
app.use(morgan('dev'));

//global variables

//routes

// starting server
app.listen(app.get('port'), () => {
    console.log('server on', app.get('port'))
});
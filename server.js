const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = 8000;

app.use(session({secret: 'miClave'}));  
app.use(flash());

//archivos estaticos
app.use(express.static(__dirname + "/static")); 

// posts
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(require('./routes/auth'));
app.use(require('./routes/routes'));


app.listen(port, function() {
    console.log('Escuchando en el puerto ' + port);
});
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


const server = app.listen(port, function() {
    console.log('Escuchando en el puerto ' + port);
});


  // Ahora creamos nuestras funciones de Sockets
const io = require('socket.io')(server);

  // cuando me conecte con algún cliente
io.on('connection', function(socket) {
    
  socket.on('enviandoMsn', function(inf){
    console.log(inf);
    socket.broadcast.emit('compartiendoMsn', inf);

  });

  socket.on('ingresando', function(data){

    socket.broadcast.emit('ingresandoUsuario', data);

  });

});
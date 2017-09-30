var express = require('express');
var todoController = require('./controllers/todoController')
var app = express();

// set up template
app.set('view engine', 'ejs');

// Include routes
todoController(app);

// static files
app.use(express.static('./public'));

// listen to a port
app.listen(3000);
console.log('Listening on port 3000');
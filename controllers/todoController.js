// ToDo Controller
var bodyParser = require('body-parser');

var fs = require('fs');
var connection = fs.readFileSync('connection.txt', 'utf8');
console.log(connection);


var mongoose = require('mongoose');
// Connect to database
mongoose.connect(connection);
// Schema for database
var todoSchema = new mongoose.Schema({
	item: String
});
// Model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

// var data = [
// 	{item: 'Get Milk'},
// 	{item: 'Walk dog'},
// 	{item: 'Kick some coding ass'}
// ];

module.exports = function(app){

	app.get('/todo', function(req, res){
		// get data from mongodb
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos: data});
		})
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// get data from the view and add to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json({todos: data});
		});
	});

	app.delete('/todo/:item', function(req, res){
		// delete the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
		
	});

};
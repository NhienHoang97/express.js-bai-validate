console.log(process.env.SESSTION_SECRET);
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var port = 9080;
var app = express();

app.set('view engine', 'pug') //view engine bai2 
app.set('views', './views')
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('process.env.SESSTION_SECRET'));

app.get('/', function(req, res){ 
	res.render('index', {
		name:'AAA'
	});
});

app.get('/styles/custom.css', function(req, res){
	res.send('abc');
});
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth',authRoute)

app.listen(port ,function(){
	console.log('sever listening on port' + port);
});
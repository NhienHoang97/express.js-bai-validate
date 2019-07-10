// console.log(process.env.SESSTION_SECRET);
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var csurf = require('csurf');
var userRoute = require('./routes/user.route');
var cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var productRoute = require('./routes/product.route')
var sessionMiddleware = require('./middlewares/session.middleware');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route')
var port = 9080;
var app = express();

app.set('view engine', 'pug') //view engine bai2 
app.set('views', './views')
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('process.env.SESSTION_SECRET'));
app.use(sessionMiddleware);
app.use(csurf({cookie: true}));
app.get('/', function(req, res){ 
	res.render('index', {
		name:'AAA'
	});
});

app.get('/styles/custom.css', function(req, res){
	res.send('abc');
});
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute);
app.use('/cart',cartRoute);
app.use('/transfer',authMiddleware.requireAuth,transferRoute);

app.listen(port ,function(){
	console.log('sever listening on port' + port);
});
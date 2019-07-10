var db = require('../db');

module.exports.addToCart = function(req,res,next){
	var productId = req.params.productId; // lay ra productid da 
	var sessionId = req.signedCookies.sessionId; // lay ra sessionId 

	if(!sessionId){
		res.redirect('/products');//quay ve trang products
		return; 
	}
	//lay giá trị ban đầu của nó ra
	var count = db
		.get('sessions')	
		.find({id: sessionId})
		.get('cart.' + productId, 0)
		.value();
	db.get('sessions')
		.find({id: sessionId})
		.set('cart.' + productId, count + 1)
		.write();
	res.redirect('/products');		
};
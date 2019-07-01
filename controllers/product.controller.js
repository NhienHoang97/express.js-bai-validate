var db = require('../db');
module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1; //n ma tai no la string nen minh dung parseint
	var perPage = 8; //x
	var start = (page - 1)*perPage;
	var end = page*perPage;
	res.render('products/index',{
		products:db.get('products').value().slice(start,end)
	});
	
};

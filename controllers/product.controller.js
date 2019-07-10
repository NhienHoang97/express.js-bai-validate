var db = require('../db');
module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1; //n ma tai no la string nen minh dung parseint
	var perPage = 8; //x
	var start = (page - 1)*perPage;
	var end = page*perPage;

	var pagIndex = db.get('products').value().length
	// console.log(pagIndex)
	var page = Math.ceil(pagIndex / perPage)

	var p = []

	for (var i = 1; i <= page; i++){
		p.push(i)
	}

	res.render('products/index',{
		products:db.get('products').value().slice(start,end),
		page: p
	});
	
};

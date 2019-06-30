// nếu người dùng chưa login ấy thì nó sẽ bắt buôicj người dùng phải login ms vào đc user
// neu face id thì mình xài cái, kiem tra may cai faceid
var db = require('../db');
module.exports.requireAuth = function(req, res ,next) {
	// cái thằng này dùng để check xem cookkie có được gửi lên hay không 
	console.log(req.cookies,req.signedCookies);
	//muon xem cookie cua no co the dung debugger;
	if(!req.signedCookies.userId){ // nếu ko nhập
		res.redirect('/auth/login');// bắt họ nhập vào đúng vào còn nếu ko là cho ra trang chủ liền
		return;
	}
	var user = db.get('users').find({ id :req.signedCookies.userId}).value()//.value( de no tra ve object cho minh)
	if(!user) { // neu no ko tim thay thang user nua thi lai return no, kh
		res.redirect('/auth/login');// bắt họ nhập vào đúng vào còn nếu ko là cho ra trang chủ liền
		return;
	}
	// bai 16 minh gan cho no them mot gia tri
	res.locals.user = user; // cai local nay no chi ton tai tai vong doi cua req ,res
	//khong bi anh huong toi cac cai khac
	next();


};
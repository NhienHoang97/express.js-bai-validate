var express = require('express');
var shortid = require('shortid');
var router = express.Router();
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');
	
var controller = require('../controllers/user.controller');
router.get('/cookie', function(req, res, next){
	res.cookie('user-id',12234);
	res.send('hello');
});

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);

router.get('/:id',controller.get);
router.post('/create',validate.postCreate, controller.postCreate);
module.exports = router;
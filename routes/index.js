var 
	requireTree = require('require-tree'),
	controllers = requireTree('../controllers'),
	router      = require('express').Router();

router.get('/', controllers.render('index', { title: 'Init' }));

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/wellbeingControllers.js');
const userController = require('../controllers/userController.js');
const goalController = require('../controllers/goalController.js');
const auth = require('../auth/auth.js');
const { ensureLoggedIn } = require('connect-ensure-login');

//Wellbeing routes
router.get('/', controller.showHome);
router.get('/about', controller.showAbout);
router.get('/nutrition', ensureLoggedIn('/login'), controller.showNutrition);
router.get('/fitness', ensureLoggedIn('/login'), controller.showFitness);
router.get('/lifestyle', ensureLoggedIn('/login'), controller.showLifestyle);

//User routes
router.get(
	'/register',
	userController.checkNotAuthenticated,
	userController.showRegister
);
router.post(
	'/register',
	userController.checkNotAuthenticated,
	userController.registerUser
);
router.get(
	'/login',
	userController.checkNotAuthenticated,
	userController.showLogin
);
router.post(
	'/login',
	userController.checkNotAuthenticated,
	auth.authenticate(),
	userController.postLogin
);
router.get('/logout', userController.logout);

//Goal routes
router.get('/goals', ensureLoggedIn('/login'), goalController.getGoals);
router.get('/create', ensureLoggedIn('/login'), goalController.createGoal);
router.post('/create', ensureLoggedIn('/login'), goalController.createEntry);
router.get('/goals/:_id', goalController.completeGoal);
router.get(
	'/complete',
	ensureLoggedIn('/login'),
	goalController.getCompleteGoals
);
router.post(
	'/searchComplete',
	ensureLoggedIn('/login'),
	goalController.searchCompGoal
);
router.get('/update/:_id', ensureLoggedIn('/login'), goalController.showUpdate);
router.post('/updated/:_id', goalController.updateGoal);
router.post(
	'/delete/:_id',
	ensureLoggedIn('/login'),
	goalController.deleteGoal
);
router.post('/search', ensureLoggedIn('/login'), goalController.searchGoal);

// Error handling
router.use(function (req, res) {
	res.status(404);
	res.type('text/plain');
	res.send('404 Not found.');
});
router.use(function (err, req, res, next) {
	res.status(500);
	res.type('text/plain');
	res.send('Internal Server Error.');
});

module.exports = router;

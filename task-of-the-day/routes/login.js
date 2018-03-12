const express	=	require('express');
const file 	=	require('../file_oprations/file_oprations.js');
const passport	=	require('passport');
const LocalStrategy	=	require('passport-local').Strategy;
let router	=	express.Router();


passport.use( new LocalStrategy( (username, password, done) => {
	// search for username and password in database.
	if(file.findUser(username, password, true) !== -1) {
		return done(null, true);
	} else {
		let err = new Error('Unauthorize Error');
  		err.status = 401;
  		throw err;
	}
}));



router.post('/', passport.authenticate('local',{session: false}),
	(req, res, next) => {
	res.render('layout', {
		titile:"User Console",
		body:`<h3>Hi ! ${req.body.username}.You have successfully logged in.</h3>`
	});
});


module.exports = router;
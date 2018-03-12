const express = require('express');
const bodyParser = require('body-parser');

const passport	=	require('passport');
const LocalStrategy	=	require('passport-local').Strategy;


let app 	=	express();

// middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware.
passport.use( new LocalStrategy( {
	usernameField : 'email',
	passwordField : 'pass'
},(username, password, done) => {
	if(username === 'pawan' && password === "123456789222") {
		return done(null, true);
	} else {
		return done(null, false);
	}
}));

app.get('/', (req, res, next) => {
	console.log('GET /');
	res.send("Welcome to my website");
});

app.post('/', passport.authenticate('local', {session:false}),
	(req, res, next) => {
		console.log('POST /',req.body.email, req.body.pass);
		res.send("You have logged successfully");
});


app.listen(3000, ()=> {
	console.log("Server starts running from port 30000...");
});
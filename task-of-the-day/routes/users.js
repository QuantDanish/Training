var express = 	require('express');
var file 	=	require('../file_oprations/file_oprations.js');
var router 	= 	express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	let list = file.showUser();
	

	if( list !== null) {
		res.json(list);
	} else {
		res.render("layout", {
			title:"User Page",
			body:"No user yet."
		});
	}

	
  
});


/* POST add user*/
router.post('/', (req, res, next)=> {
	let message = "Please Enter a valid username and password.";
	console.log(req.body.username, req.body.password);
	if(req.body.username !== undefined || req.body.password !== undefined) {
		if(file.addUser(req.body.username, req.body.password))
			message = "You Have been Added as user.";
		else message = "username Already Exists.!";
	}
	res.render("layout", {
		title:"User Page",
		body:`<h1>${message}</h1>`
	});
});



/* PUT update user details */
router.put('/', function(req, res, next) {
	let message='username NOT FOUND';
	if(file.updatepassword(req.body.username, req.body.password)) {
		message = "Your password successfully updated";
	}

	res.render("layout", {
		title:"User Page",
		body: message
	});
  
});


/* DELET to remove a user*/
router.delete('/', function(req, res, next) {
	res.render("layout", {
		title:"User Page",
		body:"You Have removed from user's list"
	});
  
});




module.exports = router;

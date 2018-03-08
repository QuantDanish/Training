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
	file.addUser(req.body.Username, req.body.Password);

	res.render("layout", {
		title:"User Page",
		body:"You have been added. !!"
	});
});



/* PUT update user details */
router.put('/', function(req, res, next) {
	let message='Username NOT FOUND';
	if(file.updatePassword(req.body.Username, req.body.Password)) {
		message = "Your Password successfully updated";
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

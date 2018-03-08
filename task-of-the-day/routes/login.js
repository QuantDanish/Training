const express	=	require('express');
const file 	=	require('../file_oprations/file_oprations.js');
var router	=	express.Router();

router.post('/', (req, res, next) => {
	let message = "Permissoin Denied";
	if(file.findUser(req.body.Username, req.body.Password, true) !== -1) {
		message = "You Have logged successfully.";
	}
	res.render('layout', {
		titile:"User Console",
		body:`<h1>${message}</h1>`
	});
});


module.exports = router;
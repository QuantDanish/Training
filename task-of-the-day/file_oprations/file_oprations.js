const jsonfile  = require('jsonfile');
const file 	=	__dirname+'/../data/data.json'; 




/* find a user in the database  withPassword is boolean 
	wheater to perfome matching	with password or not\
*/
module.exports.findUser = (username, password, withPassword) => {
	try{
		let temp =  jsonfile.readFileSync(file);
		return temp.findIndex((item) => {
			return (item.Username === username) ?
			(withPassword? item.Password === password: true) 
			:false;
		})
	}catch(err){
		console.log(err.message);
		return -1;
	}
}




//adding username and password onto file.
module.exports.addUser = (username, password) => {
	try{
		let temp	=	jsonfile.readFileSync(file);
		let user 	=	{
			Username:username,
			Password: password
		};
		temp.push(user);
		jsonfile.writeFileSync(file, temp);
	}catch(err){
		console.log(err.message)
	}

}


/* updating password of a user*/

module.exports.updatePassword = (username, password) => {
	try{
		let temp	=	jsonfile.readFileSync(file);

		let index 	=	temp.findIndex((item, index) => {
			return item.Username === username;
		});

		if( index === -1){
			return false;
		}

		let user = temp[index];
		user.Password = password;
		
		jsonfile.writeFileSync(file, temp);
		return true;

	}catch(err){
		console.log(err.message)
		return false;
	}

}



/* remove a user */
module.exports.removeUser = (username, password) => {
	try{
		let temp	=	jsonfile.readFileSync(file);
		let index 	=	temp.findIndex((item ) => {
			return item.Username === username;
		});

		if(index === -1){
			return false;
		}

		temp.splice(index,1);
		jsonfile.writeFileSync(file, temp);
		return false;
	}catch(err){
		console.log(err.message)
		return false;
	}

}


/*  show list of username */
module.exports.showUser = () => {
	try{
		let temp	=	jsonfile.readFileSync(file);
		let userList=	[];

		for(let user of temp) {
			userList.push(user.Username);
			console.log(user.Username);
		}
		return  userList;
	}catch(err){
		console.log(err.message)
		return null;
	}

}
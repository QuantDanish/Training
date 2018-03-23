const MongoClient	=	require('mongodb').MongoClient;
const config		=	require('./config.js');



/*
	List all user names.
*/

module.exports.getUserList 	=	() => {
	
	MongoClient.connect( config.url)
	.then( (client)=> {
		return new Promise((resolve, reject) => {

			let colln	=	client.db(config.dbName).getCollection(config.collections);
			let nameList = [];
			colln.find().toArray()
			.then( (data)=>{
				for( profile of data) {
					nameList.push(profile.name);
				}
				client.close();
				console.log(nameList);
				resolve(nameList);
			})
			.catch((err) => {
				// catch for toArray
				client.close();
				reject(err);
			});
		})
	})
}	
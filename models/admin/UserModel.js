var PostModel = {
	getAll: () => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		var result = dbo.collection("users").find({}).toArray();
		return result;
	},
	getById: id => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');

		var ObjectID = require('mongodb').ObjectID;

		var result = dbo.collection("users").findOne({_id: ObjectID("" + id)});
		// console.log(result);
		return result;
	},

	insert: myobj => {
		var db = require('./connect_db.js');
		var dbo = db.getDb().db('blog');
		dbo.collection("users").insertOne(myobj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
	  	});
	},
}

module.exports = PostModel;
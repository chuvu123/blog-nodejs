var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var Schema = mongoose.Schema;

//UserSchema
var PostModelSchema = new Schema({
	post_author: {
		type: String, 
		required: true
	},
	post_title: {
		type: String, 
		required: true
	},
	post_content: {
		type: String, 
		required: true
	},
	post_description: {
		type: String, 
	},

	post_status: {
		type: String, 
		required: true
	},
	post_slug: {
		type: String, 
		unique: true,
		required: true
	},
	post_image: {
		type: String, 
		required: true
	},
	post_category: {
		type: String, 
		required: true
	},
	create_at: {
		type: Date, 
		default: Date.now()
	}
})

var PostModel = mongoose.model('posts', PostModelSchema);
//create users model
var PostAction = {
	//sắp xếp giảm dần theo thời gian đăng bài
	getAll: () => PostModel.find().sort({'create_at': -1}).exec(),

	getById: id => PostModel.findById(id).exec(),
	
	//get limit post
	getLimit: (limitPost) => PostModel.find().sort({'create_at': -1}).limit(limitPost).exec(),
	store: (title, content, description, author, status, slug, image, category) => {
		PostModel.create({
			post_title: title,
			post_content: content,
			post_description: description,
			post_author: author,
			post_status: status,
			post_slug: slug,
			post_image: image,
			post_category: category,
			create_at: Date.now()
		}, (err, result) => {
			 if (err) {
			 	console.log("\nInsert fail: " + err.message);
			 }else {
				console.log("\nInserted !");
			 }
		});
	},
	update: (id, title, content, description, status, image, category) => PostModel.update({_id: id}, {
		post_title: title,
			post_content: content,
			post_description: description,
			post_status: status,
			post_image: image,
			post_category: category,
	}).exec((err, result) => {
		if (err) {
		 	console.log("\nUpdate fail: " + err.message);
		 }else {
			console.log("\nUpdated !");
		 }
	}),
	destroy: id => PostModel.remove({_id: id}).exec((err, result) => {
		if (err) {
			console.log("Delete fail !");
		} else {
			console.log("Deleted !");
		}
	})
}


module.exports = PostAction;
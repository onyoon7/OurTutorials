const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
	name: {
		type:String
	},
	email:{
		type:String,
		required: true
	},

	//링크들의 _id를 담고 있는 배열들
	createLink:[{type: ObjectId, ref: 'Link'}],
	likeLink: [{type: ObjectId, ref: 'Link'}],
	laterLink:[{type: ObjectId, ref: 'Link'}],

	createCourse: [{type: ObjectId, ref: 'Course'}],
	likeCourse: [{type: ObjectId, ref: 'Course'}]

})


module.exports = mongoose.model('User',UserSchema);
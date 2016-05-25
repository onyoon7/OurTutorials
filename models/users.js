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

	//코스와 링크, 그리고 USER의 관계는 각각 M대 N관계로 복잡합니다.
	//유저 기준으로 링크나 코스 찾는 경우가 더 많아 이쪽으로 빼 놓았습니다.

	//링크들의 _id를 담고 있는 배열들입니다.
	createLink:[{type: ObjectId, ref: 'Link'}],
	likeLink: [{type: ObjectId, ref: 'Link'}],
	laterLink:[{type: ObjectId, ref: 'Link'}],
	//코스들의 Id를 담고 있는 배열입니다.
	createCourse: [{type: ObjectId, ref: 'Course'}],
	likeCourse: [{type: ObjectId, ref: 'Course'}]

})


module.exports = mongoose.model('User',UserSchema);
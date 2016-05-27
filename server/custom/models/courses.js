const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const CourseSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	Summary: String,
	parent: {
		type: ObjectId,
		ref: 'Course',
		default: null
	},
	//칠드런 배열에서는 자기 자신, 또는 링크 아이디를 담고 있는 배열입니다.
	//isCourse가 트루이면 또 다른 Course를 안에 담고있는것과 마찬가지로 취급됩니다.
	//만약 isCourse가 false이면 평범한 link의 id로 보여집니다.
	children: [{
		isCourse: {
			type:Boolean
		},
		id :{
			type:ObjectId
		}
	}],
	likes: Number
})

module.exports = mongoose.model('Course', CourseSchema);

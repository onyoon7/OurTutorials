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
		ref: 'Course'
	},
	children: [{
		isBox: {
			type:Boolean
		},
		id :{
			type:ObjectId
		}
	}]
})

module.exports = mongoose.model('Course', CourseSchema)
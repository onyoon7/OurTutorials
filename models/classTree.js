const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const ClassTreeSchema = new Schema({
	parent: {
		type: Schema.ObjectId,
		ref: 'ClassTree'
	},
	//자기 자신의 id들을 담고 있는 배열.
	children:[{type:ObjectId, ref:'ClassTree'}]
})


module.exports = mongoose.model('ClassTree', ClassTreeSchema);
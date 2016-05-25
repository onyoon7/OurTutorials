const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const ClassTreeSchema = new Schema({
	name : {
		type: String,
		required:true
	},
	parent: {
		type: Schema.ObjectId,
		ref: 'ClassTree',
		default: null
	},
	//자기 자신의 id들을 담고 있는 배열입니다. ClassTree는 트리의 노드나 마찬가지입니다.
	children:[{type:ObjectId, ref:'ClassTree'}],
	
	links:[{type: ObjectId, ref: 'Link'}]
})


module.exports = mongoose.model('ClassTree', ClassTreeSchema);
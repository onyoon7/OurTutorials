const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const ClassTreeSchema = new Schema({
	name : {
		type: String,
		required: true
	},
	parent: [{
			_id: false,
			parentId:{
				type: Schema.ObjectId,
				ref: 'ClassTree',

			},
			name:{
				type: String,

			}
		}
	],
	//자기 자신의 id들을 담고 있는 배열입니다. ClassTree는 트리의 노드나 마찬가지입니다.
	children:[{
			_id: false,
			childId:{
				type: Schema.ObjectId,
				ref: 'ClassTree',
			},
			name:{
				type: String,

			}
		}],
	links:[{
		type: ObjectId, 
		ref: 'Link'
	}],
	courses: [{
		type: ObjectId,
		ref: 'Course'
	}]
})


module.exports = mongoose.model('ClassTree', ClassTreeSchema);
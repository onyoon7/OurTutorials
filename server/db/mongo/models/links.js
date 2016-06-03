const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.ObjectId;
const LinkSchema = new Schema({
	link: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	isValid: {
		//나중에 링크가 없어를질 경우를 대비해서 만들어놓음.
		type: Boolean,
		default: true
	},
	tag:[String],
	summary: {
		type: String
	},
	like : {
		type: Number,
		default: 0
	},
	thumbnail: {
		type: String,
		default: 'https://facebook.github.io/react/img/logo.svg'
	}
});


export default mongoose.model('Link',LinkSchema);

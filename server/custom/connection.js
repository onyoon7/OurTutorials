var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/tutorial';
var db = mongoose.connect(dbUrl).connection;
db.on('error', function (err) {
	console.error('DBERROR: ', err);
})
db.once('open', function() {
	console.log('mongodb connection open');
})
module.exports = db;

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);
db.defaults({ 
	users: [], 
	sessions: [],
	transfer: []
})
  .write();

module.exports = db;
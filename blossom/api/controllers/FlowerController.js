const mysql = require('mysql');

const dbPool = mysql.createPool({
	connectionLimit: 5,
	host: 'cloudproject.cgvh2dl8kyyq.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: 'aws_data',
	database: 'blossom',
	port: '3306'
});

module.exports = {
	getAllFlowerListView: (req, res) => {
		console.log('Received request to getAllFlowerList');
		console.log(event);
		dbPool.getConnection(function(err, partsDb) {});
	},

	getAllFlowerList: (req, res) => {},

	addNewFlower: (req, res) => {},

	updateFlowerDetails: (req, res) => {},

	deleteFlowerDetails: (req, res) => {},

	saveOrderDetails: (req, res) => {}
};

const mysql = require('mysql');

const dbPool = mysql.createPool({
	connectionLimit: 5,
	host: 'cloudproject.cgvh2dl8kyyq.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: 'aws_data',
	database: 'wickerBasket',
	port: '3306'
});

module.exports = {
	getAllBasketListView: (req, res) => {

		console.log('Received request to getAllBasketListView');
		dbPool.getConnection(function(err, basketDb) {
			if (err) {
				console.log('Failed to connect to mysql ' + err);
				//context.succeed({ statusCode: 500, message: 'Failed to connect to database' });
				res.send(err);
				return;
			}
			basketDb.query('select * from baskets', (findErr, findResult) => {
				basketDb.release();
				if (findErr) {
					console.log('Error in fetching database ' + findErr);
					//context.succeed({ statusCode: 500, message: findErr });
					res.send(findErr);
					return;
				}

				console.log(findResult);
				let response = {
					statusCode: 200,
					message: 'Successfull',
					body: findResult
				};
				res.send(response);
				//context.succeed(response);
			});
		});



	},

	getAllBasketList: (req, res) => {},

	addNewBasket: (req, res) => {},

	updateBasketDetails: (req, res) => {},

	deleteBasketDetails: (req, res) => {},

	saveOrderDetails: (req, res) => {}
};
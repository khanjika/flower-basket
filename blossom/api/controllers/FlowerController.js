const request = require('request');
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
		request(
			{
				url: 'https://bjcuqdukt5.execute-api.us-east-1.amazonaws.com/prod/getallflowerlist',
				method: 'GET'
			},
			function(error, response, body) {
				if (error) {
					res.send(500, 'Error in getting job details!!');
				}
				let result = JSON.parse(response.body);
				//let status = result.statusCode;
				console.log(result);
				if (result.statusCode != 200) {
					return res.view('pages/errorPage', {
						message: result.message
					});
				}
				if (result.statusCode == 200) {
					res.view('pages/homepage', { flowerList: result.body });
				}
			}
		);
	},

	getAllFlowerList: (req, res) => {
		request(
			{
				url: 'https://bjcuqdukt5.execute-api.us-east-1.amazonaws.com/prod/getallflowerlist',
				method: 'GET'
			},
			function(error, response, body) {
				if (error) {
					res.send(500, 'Error in getting job details!!');
				}
				let result = JSON.parse(response.body);
				//let status = result.statusCode;
				console.log(result);
				return res.json(result);
			}
		);
	},

	addNewFlower: (req, res) => {
		console.log('Received request to addNewFlower');
		dbPool.getConnection(function(err, flowerDb) {
			if (err) {
				console.log('Failed to connect to mysql ' + err);
				context.succeed({ statusCode: 500, message: 'Failed to connect to database' });
				return;
			}
			flowerDb.query('select * from flowers', (findErr, findResult) => {
				flowerDb.release();
				if (findErr) {
					console.log('Error in fetching database ' + findErr);
					context.succeed({ statusCode: 500, message: findErr });
					return;
				}

				console.log(findResult);
				let response = {
					statusCode: 200,
					message: 'Successfull',
					body: findResult
				};
				context.succeed(response);
			});
		});
	},

	updateFlowerView: (req, res) => {
		console.log('Received request to updateFlowerView');
		let flowerId = req.param('flowerId');

		request(
			{
				url: 'https://k03ohlrka4.execute-api.us-east-1.amazonaws.com/prod/getflowerdetail?flowerId=' + flowerId,
				method: 'GET'
			},
			function(error, response, body) {
				if (error) {
					res.send(500, 'Error in getting job details!!');
				}
				let responseBody = JSON.parse(response.body);
				//let status = result.statusCode;
				console.log(responseBody);
				if (responseBody.statusCode != 200) {
					return res.view('pages/errorPage', {
						message: responseBody.message
					});
				} else {
					if (responseBody.result.length > 0) {
						res.view('pages/updatepage', { flower: responseBody.result[0] });
					} else {
						return res.view('pages/errorPage', {
							message: 'Error in finding details of flower'
						});
					}
				}
			}
		);
	},

	updateFlowerDetails: (req, res) => {},

	deleteFlowerDetails: (req, res) => {},

	saveOrderDetails: (req, res) => {}
};

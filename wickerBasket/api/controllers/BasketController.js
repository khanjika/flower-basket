const request = require('request');
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
		request.get(
			{
				url: 'https://azs5932w5f.execute-api.us-east-1.amazonaws.com/prod/getallbasketlist'
			},
			async function(error, response, body) {
				if (error) {
					console.log(error);
					return res.error('Failed to get basket details. Try again');
				}
				console.log(response.body);

				let basketList = JSON.parse(response.body);
				let flag = true;
				return res.view('pages/homepage', { basketList: basketList.result });
				
			}
		);


	},

	getAllBasketList: (req, res) => {

		request.get(
			{
				url: 'https://azs5932w5f.execute-api.us-east-1.amazonaws.com/prod/getallbasketlist'
			},
			async function(error, response, body) {
				if (error) {
					console.log(error);
					return res.error('Failed to get basket details. Try again');
				}
				console.log(response.body);

				let basketList = JSON.parse(response.body);
				let flag = true;
				return res.status(200).json(basketList.result);
			}
		);


	},


	addNewBasket: (req, res) => {},

	updateBasketView: (req, res) => {
		console.log('Received request to updateBasketView');

		let basketId = req.param('basketId');
		
		
		dbPool.getConnection(function(err, basketDb) {
			if (err) {
				console.log('Failed to connect to mysql ' + err);
				//context.succeed({ statusCode: 500, message: 'Failed to connect to database' });
				res.send(err);
				return;
			}
			basketDb.query('select * from baskets where basketId = ?', [basketId], (findErr, findResult) => {
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
					result: findResult
				};
				let basket = findResult[0];
				console.log("Basket name " + basket.basketName);
				return res.view('pages/updatepage', { basket: findResult[0] });
				//context.succeed(response);
			});
		});



	},

	updateBasketDetails: (req, res) => {

		console.log(req.body.basketName);
		let basketName = req.body.basketName;
		let basketId = req.body.basketId;
		let details = req.body.details;
		let price = req.body.price;
		let quantityAvailable = req.body.quantityAvailable;

		dbPool.getConnection(function (err, basketDb) {
			if (err) {
			  console.log("Failed to connect to mysql " + err);
			  //context.succeed(err);
			  return;
			}
			//console.log(event);
			basketDb.query(
			  "select * from baskets where basketId = ?",
			  [basketId],
			  (err, result, fields) => {
				if (err) {
				  console.log(err);
				  let response = {
					statusCode: 500,
					message: "Error in fetching data from database!!",
				  };
				  //context.succeed(response);
				}
				if (result.length > 0) {
				  basketDb.query(
					"Update baskets set details=?,price=?,quantityAvailable=? where basketId = ?",
					[details, price, quantityAvailable, basketId],
					(err, result, fields) => {
					  if (err) {
						console.log(err);
						let response = {
						  statusCode: 500,
						  message: "Error in updating data!!",
						};
						//context.succeed(response);
					  }
					  let response = {
						statusCode: 200,
						message: "Successfully updated job details !!",
					  };
					  //context.succeed(response);
					}
				  );
				} else {
				  let response = {
					statusCode: 203,
					message: "JobName and partId does not exist !!",
				  };
				  //context.succeed(response);
				}
			  }
			);
			res.redirect("/");
			
		  });
		

	},

	deleteBasketDetails: (req, res) => {},

	saveOrderDetails: (req, res) => {}
};

const mysql = require('mysql');

const dbPool = mysql.createPool({
	connectionLimit: 5,
	host: 'cloudproject.cgvh2dl8kyyq.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: 'aws_data',
	database: 'wickerBasket',
	port: '3306'
});


exports.lambdaHandler = (event, context) => {
  console.log('Received request to updateBasketView');

  let basketId = event["basketId"];
  
  dbPool.getConnection(function(err, basketDb) {
	if (err) {
		console.log('Failed to connect to mysql ' + err);
		context.succeed({ statusCode: 500, message: 'Failed to connect to database' });
		//res.send(err);
		return;
	}
	basketDb.query('select * from baskets where basketId = ?', [basketId], (findErr, findResult) => {
		basketDb.release();
		if (findErr) {
			console.log('Error in fetching database ' + findErr);
			context.succeed({ statusCode: 500, message: findErr });
			//res.send(findErr);
			return;
		}
		
		let response = {
			statusCode: 200,
			message: 'Successfull',
			result: findResult
		};

		context.succeed(response);
	});
});

};
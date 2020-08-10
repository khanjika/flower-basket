const AmazonCognitoIdentityJs = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const poolData = {
	UserPoolId: 'us-east-1_7oXrtUrE1',
	ClientId: 'ecvhnqb87meq02ue62n3v2gpa'
};

const userPool = new AmazonCognitoIdentityJs.CognitoUserPool(poolData);

module.exports = {
	signUpForm: (req, res) => {
		return res.view('pages/signup');
	},

	signUp: (req, res) => {
		let username = req.body.username;
		let email = req.body.email;
		let pswd = req.body.password;
		let confirmPswd = req.body.confirmPassword;
		console.log(email);

		if (pswd != confirmPswd) {
			return res.view('pages/signup', { err: 'Password and confirm password doesnot match' });
		}
		const emailData = {
			Name: 'email',
			Value: email
		};
		const emailAttribute = new AmazonCognitoIdentityJs.CognitoUserAttribute(emailData);
		userPool.signUp(username, pswd, [ emailAttribute ], null, (err, data) => {
			if (err) {
				console.log('error occured: ' + err);
				console.error(err);
				return res.send('Failed' + err);
			}
			console.log(data);
			console.log(data.user);
			return res.send('Successful');
		});
	},

	login: (req, res) => {
		const loginDetails = {
			Username: req.body.username,
			Password: req.body.password
		};
		const authenticationDetails = new AmazonCognitoIdentityJs.AuthenticationDetails(loginDetails);
		const userDetails = {
			Username: req.body.username,
			Pool: userPool
		};
		const cognitoUser = new AmazonCognitoIdentityJs.CognitoUser(userDetails);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (data) => {
				console.log(data.accessToken);
				req.session.username = req.body.username;
				res.send(data);
			},
			onFailure: (err) => {
				console.log(err);
				res.send(err);
			}
		});
	},

	placeOrder: (req, res) => {
		return res.send(req.session.username);
	},

	showFlowerBasketCombos: (req, res) => {},

	userOrderHistory: (req, res) => {}
};

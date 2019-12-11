//web3
const myContract = require('./myContract');
var cors = require('cors')
require('./myContract');
// express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(cors())

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//use parser
app.use(bodyParser.json());

var port = 7500;

app.listen(port, function() {
	console.log(`App running on ${port}`);
});

app.post('/api/setUser', async (req, res) => {
	console.log(req.body);
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	let response = await myContract.setUser(fname, lname, email);
	console.log(response);
	res.status(200).send(response.transactionHash);
});

app.get('/api/getUser', async (req, res) => {
	var mail = req.query.mail;
	console.log(`api called`);
	// transactions
	let response = await myContract.getUser(mail);
	console.log(response);
	res.status(200).send(response);
});

app.get('/api/allUsers', async (req, res) => {
	let response = await myContract.allUsers();
	console.log(response);
	res.status(200).send(response);
});

app.get('/api/test', async (req, res) => {
	console.log("Called");
	res.status(200).send("Called");
});

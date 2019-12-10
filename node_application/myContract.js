//--------------------------------//
///MODULE IMPORTS
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/854276ba0de6437b9a3d7d0c871c4a76'));
const fs = require('fs');
const privkey = Buffer.from('89BA695A9C07AD8C64BF828C91862DB8A15A7A6FA6D5247260BE860DAE98F17C', 'hex');
//Get ABI file & build connection
const contractABI = JSON.parse(fs.readFileSync('../build/contracts/Mycontract.json', 'utf8'));
//get address from network id i.e 3
const contractAddress = contractABI.networks['3'].address;
var globe;
module.exports = { globe, contractAddress };
var contract = new web3.eth.Contract(contractABI.abi, contractAddress);
// console.log(contract);
var defaultAccount = '0x7B6716E46D02f9af0E7b78A90bBCABB2fc52E26F';

var rawTx = {
	from: defaultAccount,
	gasPrice: web3.utils.toHex(20 * 1e9),
	gasLimit: web3.utils.toHex(2100000),
	to: contractAddress,
	data: contract.methods.setUser('fhass', 'lname', 'email').encodeABI(),
	nonce: web3.utils.toHex(100000000),
};
// console.log(rawTx);
//Sign Tx with your accounts' privkey
var transaction = new Tx(rawTx, { chain: 'ropsten', hardfork: 'petersburg' });
transaction.sign(privkey);

//API//-----------------------CALL

module.exports.setUser = async (fname, lname, email) => {
	// sending Transactions
	// let hash = await contract.methods
	// 	.setUser(fname, lname, email)
	// 	.send({ from: defaultAccount, gas: 1000000, gasPrice: 1000000000 });
	let raw = '0x' + transaction.serialize().toString('hex');
	let hash = await web3.eth
		.sendSignedTransaction(raw, (err, txHash) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log('txHash:', txHash);
		})
		// .on('receipt', console.log);
	// console.log(hash);
	//res.status(200).send(`transaction hash is ${hash}`);
	return hash;
};
module.exports.getUser = async mail => {
	//get user by email
	let result = await contract.methods.getUser(mail).call();
	return result;
};
module.exports.allUsers = async () => {
	let result = await contract.methods.allUsers().call();
	return result;
};

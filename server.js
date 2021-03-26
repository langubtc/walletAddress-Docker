'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var WAValidator = require('wallet-address-validator');


function addressCheck(address,coin){
	var valid = WAValidator.validate(address, coin);

	if(valid)
	    return true;
	else
	    return false;
}


// App
const app = express();
app.get('/address/check', (req, res) => {
	var params = req.query
	if ( typeof(params.address)=='undefined' || typeof(params.coin) == 'undefined') {
		return res.status(400).json({message:'params error',code:1,http_code:400})

	}
	// 验证地址是否合法
	var backResponse = addressCheck(params.address,params.coin)
	if (backResponse == true){
		return res.status(200).json({message:'ok',code:0,http_code:200})
	}else{
		return res.status(400).json({message:'address error',code:1,http_code:400})

	}
	
});

console.log(`Running on http://${HOST}:${PORT}`);
app.listen(PORT, HOST);


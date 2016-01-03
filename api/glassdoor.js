"use strict"
var Client = require('node-rest-client').Client;
var fs = require('fs');

var client = new Client();

var getGlassDoorApiClient=function(keywords, location,pageNb){
	
	var data=fs.readFileSync('./resources/glassdoor-api-key.json','utf8');
	
	var partner_id=JSON.parse(data).Partner_ID;
	
	var key = JSON.parse(data).Key;
	
	var glassdoorReqUrl="http://api.glassdoor.com/api/api.htm?"+
"t.p="+partner_id+"&t.k="+key+"&userip=0.0.0.0&useragent=Mozilla&format=json&v.1=1&action=employers&q="+keywords+"&l="+location
+"&country=UK"+"&pn="+pageNb;
 
    client.registerMethod("getTopCompany",glassdoorReqUrl,"GET");

	return client;
	
	
}

module.exports= getGlassDoorApiClient;











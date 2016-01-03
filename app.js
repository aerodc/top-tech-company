"use strict"

var GlassDoorApiClient = require('./api/glassdoor');

var GlassDoorParser = require('./data-parser/glassdoor-parser');

var DataOp = require('./database/data-operation');

var db = require('./database/mongodb-connection').connection;

var totalPageNumbers = 0;



GlassDoorApiClient('media', 'london', 1).methods.getTopCompany(function (data, response) {
	
	//console.log(data);

	totalPageNumbers = data.response.totalNumberOfPages;

	console.log('totalPageNumbers ' + totalPageNumbers);

	var companyList = GlassDoorParser(4, data.response.employers);

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {

		DataOp(companyList);

		for (var i = 2; i <= totalPageNumbers; i++) {

			setTimeout(function () {
				GlassDoorApiClient('advertising', 'london', i).methods.getTopCompany(function (data, response) {
						//console.log(data);
					var companyList = GlassDoorParser(4, data.response.employers);
					DataOp(companyList);
				}, 1000 * 30);

			});
		}
	});


});







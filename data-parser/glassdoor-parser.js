var _ = require('lodash');


var getTopRateCompany = function(rate, rawData){
	
	var companyList=[];
	
	var temp;
	
	temp=_.filter(rawData, function(item){
		return item.overallRating>=rate;
	});

	_.map(temp,function(item){
		var company={
			gdId: item.id,
			name: item.name,
			overallRating:item.overallRating,
			industry:item.industry
			
		};
		
		companyList.push(company);
		
	});
	
	return companyList;
	
	
}




module.exports = getTopRateCompany;
var mongoose = require('mongoose');
var _ = require('lodash');

var Schema = mongoose.Schema;

var companySchema = new Schema({
	gdId: Number,
	name: String,
	industry: String,
	createdDate: { type: Date, default: Date.now },
	overallRating: Number
});

var Company = mongoose.model('Company', companySchema);

var saveGlassDoorData = function (data) {

	_.map(data, function (item) {
		var comtoSave = new Company(item);
		Company.find({ gdId: item.gdId }, function (err, docs) {
			if (docs.length) {
				console.log(item.name + ' ' + 'existed!');

			} else {
				comtoSave.save(function (err, comtoSave) {
					if (err) return console.error(err);
					console.log(comtoSave.name + 'saved!');
				});
			}
		});

	});

}


module.exports = saveGlassDoorData;


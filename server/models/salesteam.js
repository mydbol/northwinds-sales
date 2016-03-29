var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northwindssales');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var salesPeopleSchema = new mongoose.Schema({ 
	name : {type : String},
	uuid: {type : String},
	regions : {type : Array}
});
//sales people mpdel
var SalesPeople= mongoose.model('SalesPeople',salesPeopleSchema);

module.exports=SalesPeople;
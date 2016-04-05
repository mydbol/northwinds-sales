var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/node_modules/', express.static(path.join(__dirname,'../node_modules/')));
app.use('/public/', express.static(path.join(__dirname,'../public/')));
app.use('/client/',express.static(path.join(__dirname,'../client/')));
app.use('/api/sales/team/',require(path.join(__dirname,'/routes/api/sales/team.js')));
app.use('/',function(req,res,next){
	 res.sendFile(path.resolve(path.join(__dirname,'../public/index.html')));
});

var server = app.listen(3000,function(){console.log('server running on 3000')});

module.exports = server;
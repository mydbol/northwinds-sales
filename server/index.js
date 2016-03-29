var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/angular/',express.static('../node_modules/angular/'));
app.use('/public/', express.static('../public/'));
app.use('/bootstrap/', express.static('../node_modules/bootstrap/dist/'));
app.use('/client/',express.static('../client/'));
app.use('/api/sales/team/',require(__dirname+'/routes/api/sales/team.js'));

app.use('/',function(req,res,next){
	//res.status(200).sendFile(__dirname+'/../public/index.html');
	 res.sendfile(path.resolve('../public/index.html'));
});

var server= app.listen(3000,function(){console.log('server running on 3000')});

module.exports = server;
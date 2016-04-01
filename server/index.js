var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));//why?
app.use(bodyParser.json());

app.get('/',function(req,res,next){
	 res.sendfile(path.join(__dirname, '../public/index.html'));
});

//too many static routes-- if you're doing this because of security then use bower to deliver your files
app.use('/angular/',express.static(path.join(__dirname, '../node_modules/angular/')));
app.use('/public/', express.static(path.join(__dirname, '../public/')));
app.use('/bootstrap/', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/')));
app.use('/client/',express.static(path.join(__dirname, '../client/')));
app.use('/api/sales/team/',require(__dirname+'/routes/api/sales/team.js'));


var server= app.listen(3000,function(){console.log('server running on 3000')});

module.exports = server;

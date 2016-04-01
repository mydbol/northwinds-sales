/* tThis file contains all the routes need to team member operations*/
var router = require('express').Router();

module.exports = router;

var SalesPeople = require('../../../models/salesteam.js');

router.get('/',function(req,res,next){ // list all team members
	SalesPeople.find({})
	.then(function(result){
		res.json({salesPeople:result});
	})
	.catch(function(err){
		res.json(err);
	}, next);
	
});

router.get('/:id',function(req,res,next){ // get one team member
	SalesPeople.findOne({_id : req.params.id})
	.then(function(person){
		res.json(person);
	}, next);
});

router.post('/',function(req,res,next){ //add a new sales person
	SalesPeople.create({name:req.body.name,uuid:req.body.uuid, regions:req.body.regions})
	.then(function(result){
		res.json({newSalesPerson:result});
	}, next);
	
});

//update a new sales person
router.post('/:id',function(req,res,next){ 
	SalesPeople.findById(req.params.id)
	.then(function(salesPerson){
		salesPerson.name = req.body.name;
		salesPerson.regions = req.body.regions;
		return salesPerson.save();
	})
	.then(function(updatedPerson){
		res.json(updatedPerson);
	}).catch(function(err){
    next(err);
	});
	
});
//update a new sales person
router.delete('/:id',function(req,res,next){ 
	SalesPeople.findOne({_id : req.params.id})
	.then(function(person){
		return person.remove();
	})
	.then(function(result){
		res.json(result);
	});
});



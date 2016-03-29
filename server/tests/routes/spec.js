/* this test was writen to test the routes needed  CRUD sales team members*/
var requester=require('supertest');
var server = require('../../../server');
var expect = require('chai').expect;
var SalesPeople = require('../../models/salesteam.js');
	
	describe('test team member crud routes',function(){
			SalesPeople.remove({})
			.then(function(result){
				done();
			});	
	describe('server test',function(){
		it('server is running',function(done){
			requester(server)
			.get('/')
			.expect(200,done);
		});
	});
	
	describe('test all sales team routes', function(){

		it('make sure there are no sales team members',function(done){
			requester(server)
			.get('/api/sales/team/')
			.expect(200)
			.end(function(err,res){
				if(err){return done(err)};
				expect(res.body.salesPeople.length).to.equal(0);
				done();
			});
		});
	
		it('adds a team member to the database',function(done){
			requester(server)
			.post('/api/sales/team/')
			.send({
				name: 'Kevin OBrien',
				uuid: '123',
				regions : ['North','East','South']
			})
			.expect(200)
			.end(function(err,res){
				if(err){return done(err)}
				expect(res.body.newSalesPerson._id != '');
				done();
			});
		});

		it('get a user by id ',function(done){
			SalesPeople.findOne({})
			.then(function(person){
				requester(server)
				.get('/api/sales/team/'+person._id)
				.expect(200)
				.end(function(err,res){	
					if(err){return done(err);}
					expect(res.body._id).to.equal(person._id.toString());
					done()
				});
			});
		});

		it('updates a sales persons data by id',function(done){
			SalesPeople.findOne({})
			.then(function(person){
				var id = '/api/sales/team/'+person._id;
				requester(server)
				.post(id)
				.send({
					name : 'Kevin J OBrien',
					regions : ['North','South']				
				})
				.expect(200)
				.end(function(err,res){
					if(err){return done(err);}
					expect(res.body.regions.length).to.equal(2)
					done();
				});
			});
		});

		xit('deletes a sales person by id',function(done){
			SalesPeople.findOne({})
			.then(function(person){
				requester(server)
				.del('/api/sales/team/'+person._id)
				.end(function(err,res){
					if(err){return done(err);}
					expect(res.body._id).to.equal(person._id.toString());
					done();
				});
			});
		});

	});

});
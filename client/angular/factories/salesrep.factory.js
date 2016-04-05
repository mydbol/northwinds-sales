app.factory('salesrepFactory',function($http){
	return{
		getTeam: function(){
				return $http({method:"GET",url:"/api/sales/team/"})
				.then(function(salesTeam){
					//console.log(salesTeam.data.salesPeople)
					return salesTeam.data.salesPeople;
				});
		},
		addRep: function(repObj){
			return $http({method:"POST",url:"/api/sales/team/",data:repObj})
				.then(function(salesRep){
					return salesRep.data.newSalesPerson;
				});
		},
		deleteRep: function (rep){
			return $http({method:"DELETE",url:"/api/sales/team/"+rep._id})
				.then(function(salesRep){
					return salesRep;
				});
		},
		updateRep: function (repObj){
			return $http({method:"POST",url:"/api/sales/team/"+repObj._id,data:repObj})
				.then(function(salesRep){
					return salesRep.data;
				});
		}
	}
});


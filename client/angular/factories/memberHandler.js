app.factory('salesTeamManager',function($http){
	return{getTeam,getRep,addRep,deleteRep,updateRep};
	function getTeam(){
		//return [{uuid:122,name:'Kevin OBrien', regions:['North','South','East']},{uuid:123,name:'Kevin OBrien', regions:['West','East']}];
			return $http({method:"GET",url:"/api/sales/team/"})
			.then(function(salesTeam){
				//console.log(salesTeam.data.salesPeople)
				return salesTeam.data.salesPeople;
			});
		
	}
	function getRep(repId){

	}
	function addRep(repObj){
		return $http({method:"POST",url:"/api/sales/team/",data:repObj})
			.then(function(salesRep){
				return salesRep.data.newSalesPerson;
			});
	}
	function deleteRep(rep){
		return $http({method:"DELETE",url:"/api/sales/team/"+rep._id})
			.then(function(salesRep){
				//console.log(salesTeam.data.salesPeople)
				return salesRep;
			});
	}
	function updateRep(repObj){
		return $http({method:"POST",url:"/api/sales/team/"+repObj._id,data:repObj})
			.then(function(salesRep){
				return salesRep.data;
			});
	}
	
});


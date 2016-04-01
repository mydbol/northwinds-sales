var app=angular.module('northwindsales',[])

app.controller('teamManager',function($scope,salesTeamManager,regionsHandler){
	//$scope.test={text:'your scope is alive'}
	$scope.SalesReps=[];
	$scope.currentRep={};
	$scope.regions=regionsHandler.getRegions();
	salesTeamManager.getTeam()
	.then(function(reps){
		$scope.SalesReps=reps;
	});
	$scope.checkifRegionSelected=function(region){
		if($scope.currentRep.regions.indexOf(region) > -1){return 'regionSelected'}
	}
	$scope.toggleRegion=function(region){
		if($scope.currentRep.regions.indexOf(region) > -1){
			$scope.currentRep.regions.splice($scope.currentRep.regions.indexOf(region),1)
		}else{
			if($scope.currentRep.regions.length < 3){$scope.currentRep.regions.push(region)};
		}

	}
	$scope.addNewUser=function(rep){
		rep.regions=[];
		salesTeamManager.addRep(rep)
		.then(function(newRep){
			$scope.SalesReps.push(newRep);
			$scope.newRep={};
			$scope.showadder=false;
		});
	}
	$scope.delete=function(rep){
		if(rep.regions.length > 0){return};		
		salesTeamManager.deleteRep(rep)
		.then(function(deletedRep){
			for(var i = 0; i < $scope.SalesReps.length;i++){
			if(deletedRep.data._id == $scope.SalesReps[i]._id){
				$scope.SalesReps.splice(i,1);
				$scope.currentRep={};
			};
		}
		});
	}
	
	

	$scope.edit=function(rep){
			angular.copy(rep,$scope.currentRep);
	}

	$scope.save=function(rep){
		salesTeamManager.updateRep(rep)
		.then(function(updatedRep){
			for(var i = 0; i < $scope.SalesReps.length;i++){
				if(updatedRep.uuid == $scope.SalesReps[i].uuid){angular.copy(updatedRep,$scope.SalesReps[i]);return};
			}
		});
	}
		
	$scope.cancel=function(rep){
		for(var i = 0; i < $scope.SalesReps.length;i++){
			if(rep.uuid == $scope.SalesReps[i].uuid){angular.copy($scope.SalesReps[i],$scope.currentRep)}
		}
	}

});
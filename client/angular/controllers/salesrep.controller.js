app.controller('teamManager',function($scope,salesrepFactory,regionsFactory){
	//$scope.test={text:'your scope is alive'}
	$scope.SalesReps=[];
	$scope.currentRep={};
	$scope.regions=regionsFactory.getRegions();
	salesrepFactory.getTeam()
	.then(function(reps){
		$scope.SalesReps=reps;
	});
	$scope.checkifRegionSelected=function(region){
		if($scope.currentRep.regions.indexOf(region) > -1){return 'regionSelected';}
	}
	$scope.toggleRegion=function(region){
		var currentRepRegions = $scope.currentRep.regions
		var regionIndex = currentRepRegions.indexOf(region);
		if(regionIndex > -1){
			currentRepRegions.splice(regionIndex,1);
			return;
		}
		if(currentRepRegions.length < 3){
			currentRepRegions.push(region);
			return;
		}
	}
	$scope.addNewUser=function(rep){
		rep.regions=[];
		salesrepFactory.addRep(rep)
		.then(function(newRep){
			$scope.SalesReps.push(newRep);
			$scope.newRep = {};
			$scope.showadder = false;
		});
	}
	$scope.delete=function(rep){
		if(rep.regions.length > 0){return};		
		salesrepFactory.deleteRep(rep)
		.then(function(deletedRep){
			for(var i = 0; i < $scope.SalesReps.length;i++){
				if(deletedRep.data._id == $scope.SalesReps[i]._id){
					$scope.SalesReps.splice(i,1);
					$scope.currentRep={};
					return;
				}
			}
		});
	}
	
	$scope.edit=function(rep){
		angular.copy(rep,$scope.currentRep);
	}

	$scope.save=function(rep){
		salesrepFactory.updateRep(rep)
		.then(function(updatedRep){
			for(var i = 0; i < $scope.SalesReps.length;i++){
				if(updatedRep.uuid == $scope.SalesReps[i].uuid){angular.copy(updatedRep,$scope.SalesReps[i]);
					return;
				}
			}
		});
	}
		
	$scope.cancel=function(rep){
		for(var i = 0; i < $scope.SalesReps.length;i++){
			if(rep.uuid == $scope.SalesReps[i].uuid){angular.copy($scope.SalesReps[i],$scope.currentRep)}
		}
	}
});
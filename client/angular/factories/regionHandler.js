app.factory('regionsHandler',function(){
	return {
    getRegions: getRegions
  };
	function getRegions(){
		return ['North','South','East','West'];
	}
});

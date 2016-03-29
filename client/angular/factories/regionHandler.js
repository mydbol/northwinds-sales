app.factory('regionsHandler',function(){
	return {getRegions};
	function getRegions(){
		return ['North','South','East','West'];
	}
});
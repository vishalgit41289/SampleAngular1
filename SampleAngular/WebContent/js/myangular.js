
var app=angular.module('myFirstApp', []);

app.controller('myFirstController',function($scope,$http){
	
    $scope.isshowtable = false;
    $scope.isCountry =false;
    $scope.sortType     = 'name'; 
    $scope.sortReverse  = false;  
    $scope.isAddCountry =false;
    $scope.isEditCountry =false;
    
	$scope.getCountryData =function(){
		
		//alert("adsf");
		var prodUrl ="http://services.groupkt.com/country/get/all";
		//alert(prodUrl);
		$http.get(prodUrl).then(function mySuccess(response) {
				
			$scope.globalData = response.data.RestResponse.result;
	        $scope.countryData = response.data.RestResponse.result;
	        $scope.isshowtable = true;
	        $scope.isCountry =true;

	        // $scope.myWelcome = response.data;

	    }, function myError(response) {
	    	
	    	//alert("error");	
	        $scope.myWelcome = response.statusText;
	    });
	}
	
	
	$scope.pageChange = function(){
		
		$scope.startPageIndex =0;
		$scope.endPageIndex =$scope.drpdwn;
		$scope.countryData = $scope.globalData.slice($scope.startPageIndex, $scope.endPageIndex);
	}
	
	
	$scope.sortByName = function(x){
	    $scope.sortType     = x;
	    $scope.sortReverse  = !$scope.sortReverse; 
	}
	
	$scope.getPrevCountryData =function(){
		$scope.endPageIndex =$scope.startPageIndex;
		$scope.startPageIndex =parseInt($scope.startPageIndex)-parseInt($scope.drpdwn);	
		$scope.countryData = $scope.globalData.slice($scope.startPageIndex, $scope.endPageIndex);
	}
	$scope.getNextCountryData =function(){
		$scope.startPageIndex =$scope.endPageIndex;		
		$scope.endPageIndex =parseInt($scope.endPageIndex)+parseInt($scope.drpdwn);		
		$scope.countryData = $scope.globalData.slice($scope.startPageIndex, $scope.endPageIndex);
	}
	
	$scope.filterTxt = function(x){
		
		alert($scope.searchtxt);
		
		$scope.countryData = $filter.globalData('name',$scope.searchtxt);
		
	}
	
	$scope.addCountryData = function(){
		
		$scope.detailsModel = {
	            "name": $scope.addCountryName,
	            "alpha2_code": $scope.addCountryAlpha2,
	            "alpha3_code": $scope.addCountryAlpha3
	        };
		
		$scope.countryData.push($scope.detailsModel);
		
		alert($scope.addCountryName+"  Added successfully!!")
		$scope.isAddCountry =false;
	}
	$scope.deleteCountryData = function(x,y){
		
		var check=confirm("Do you want to delete  "+y.name);
		
		if(check){
		$scope.countryData.splice(x,1);}
		else{
			alert("Delete request cancel");
		}
	}
	
	$scope.editCountryData = function(){
				
	
		
		$scope.countryData[$scope.spliceIndex].name = $scope.editCountryName
		$scope.countryData[$scope.spliceIndex].alpha2_code = $scope.editCountryAlpha2;
		$scope.countryData[$scope.spliceIndex].alpha3_code = $scope.editCountryAlpha3;
		
		alert($scope.editCountryName+"  Update successfully!!")
		$scope.isEditCountry =false;
	}
	$scope.editCountryPopup = function(x,y){
		
	    $scope.isEditCountry =true;

		$scope.editCountryName = y.name;
		$scope.editCountryAlpha2 = y.alpha2_code;
		$scope.editCountryAlpha3 = y.alpha3_code;
		$scope.spliceIndex=x;
		
	}
	
	
	$scope.editCountryPopupCancel = function(){
	    $scope.isEditCountry =false;

	}
	
	$scope.addCountryPopup =function(){
		
	    $scope.isAddCountry =true;

	}
	$scope.addCountryPopupCancel =function(){
		
	    $scope.isAddCountry =false;

	}
	
});


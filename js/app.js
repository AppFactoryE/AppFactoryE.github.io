var ei_events = angular.module('ei_events',[]);
ei_events.controller('ei_eventsController',['$scope','$location','$http','$rootScope','$timeout',function($scope, $location, $http, $rootScope, $timeout,servicecall) {

//$scope.calMobData = ["Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017", "Jun 2017","Jul 2017", "Aug 2017", "Sept 2017", "Oct 2017", "Nov 2017", "Dec 2017"];
$scope.yr1 = ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
$scope.index = 9;$scope.yr="2017";$scope.index1 = 6;
$scope.calData=[ {'Month':"Jan"}, {'Month':"Feb"}, {'Month':"Mar"}, {'Month':"Apr"}, {'Month':"May"}, {'Month':"Jun"},{'Month':"Jul"}, {'Month':"Aug"},{'Month':"Sept"}, {'Month':"Oct"}, {'Month':"Nov"}, {'Month':"Dec"}];
//$scope.activeMenu = $scope.calData[9];
$scope.calMobCurrData = $scope.calData[9];

$scope.nextClk = function (){
  $scope.index = $scope.index + 1;
  if($scope.index == 12){
    $scope.index = 0;
    $scope.index1 = $scope.index1 + 1;
    $scope.yr = $scope.yr1[$scope.index1];
  }
  $scope.calMobCurrData = $scope.calData[$scope.index];
};
    
$scope.prevClk = function (){
  $scope.index = $scope.index - 1;
  if($scope.index == -1){
    $scope.index = 11;
    $scope.index1 = $scope.index1 - 1;
    $scope.yr = $scope.yr1[$scope.index1];
  }
  $scope.calMobCurrData = $scope.calData[$scope.index];
};

$scope.nxClk = function (){
  $scope.index1 = $scope.index1 + 1;
  $scope.yr = $scope.yr1[$scope.index1];
}
    
$scope.prClk = function (){
  $scope.index1 = $scope.index1 - 1;
  $scope.yr = $scope.yr1[$scope.index1];

}

$scope.calClk = function(calVal){
  $scope.calMobCurrData = calVal;
  for(var i=0;i<=$scope.calData.length; i++){
    if($scope.calData[i] == calVal){
      $scope.index = i;
    };
  }
};

$scope.data = {
	events: [{
	"e0": "images/s2.png",	
    "e1": "Machine Intelligence Summit + Data Research Days 2017",
    "e2": "BA Networks, BNEW DNEW Development, Unit Networks, BU Network Products",
    "e3": "Oct 10, 2017 to Oct 11, 2017",
    "e4": "Internal",
    "e5": "Anders Gartner"
	}, 
	{
	"e0": "images/s1.png",	
    "e1": "Poineering at the Digital Frontier",
    "e2": "MA South East Asia Oceania & India",
    "e3": "Oct 10, 2017 to Oct 18, 2017",
    "e4": "Customer Event",
    "e5": "Anders Torres"
	},
	{
	"e0": "images/s3.png",	
    "e1": "Ericsson Network Security Seminar",
    "e2": "BA Managed Services, BA Networks, Media, GF Technology & BU Network Products",
    "e3": "Oct 11, 2017 to Oct 12, 2017",
    "e4": "Internal",
    "e5": "Mikko Karikyto"
	},
	{
	"e0": "images/s1.png",	
    "e1": "Data Research Days 2017",
    "e2": "BA Networks, BNEW DNEW Development, Unit Networks, BU Network Products, BA Networks, BNEW DNEW Development, Unit Networks, BU Network Products",
    "e3": "Oct 10, 2017 to Oct 11, 2017",
    "e4": "Internal",
    "e5": "Anders Gartner"
	}, 
	{
	"e0": "images/s3.png",	
    "e1": "Ericsson Digital Events",
    "e2": "BA Networks, BNEW DNEW Development, Unit Networks, BU Network Products",
    "e3": "Mar 30 - Mar 31, 2018",
    "e4": "Internal",
    "e5": "Anders Gartner"
	},
	{
	"e0": "images/s2.png",	
    "e1": "Innovation in an Aging Society Digital Event",
    "e2": "BA Networks, BNEW DNEW Development, Unit Networks, BU Network Products",
    "e3": "Oct 31 - Oct 30, 2018",
    "e4": "Internal",
    "e5": "Anders Gartner"
	}]
};


// window.addEventListener('beforeinstallprompt', function(e) {
//   // beforeinstallprompt Event fired

//   // e.userChoice will return a Promise.
//   // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
//   e.userChoice.then(function(choiceResult) {

//     console.log(choiceResult.outcome);

//     if(choiceResult.outcome == 'dismissed') {
//       console.log('User cancelled home screen install');
//     }
//     else {
//       console.log('User added to home screen');
//     }
//   });
// });


}]);
                                                 
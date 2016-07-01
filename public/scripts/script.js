var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function ($routeProvider){ // use ngRoute to display 2 views
  $routeProvider.
      when("/add_hero",{
        templateUrl: "/ngroutes/add_hero.html",
        controller:"controller"
      }).
      when("/view_hero",{
        templateUrl: "/ngroutes/view_hero.html",
        controller:"controller"
      }).
      otherwise({
        redirectTo: "/add_hero"
      });

}]);//end ngrouter

//create controller for page
myApp.controller('controller', ['$scope', '$http', function( $scope , $http ){
  var refreshPage = function(){
    $http({
      method: "GET",
      url: "/heroes",
    }).then( function( response ){
      $scope.allHeroes = response.data;
      // console.log(response.data);
    });
  };
  //load items on load
 refreshPage();

//define power selection options
$scope.choosePower=[
  {powerId : 1, name : "Invisibility"},
  {powerId : 2, name : "Flight"},
  {powerId : 3, name : "Super Speed"},
  {powerId : 4, name : "Heat Vision"},
  {powerId : 5, name : "Super Strength"},
  {powerId : 6, name : "Accelerated Healing"},
  {powerId : 7, name : "Power Blast"},
  {powerId : 8, name : "Animal Affinity"},
];

  //collect user input from form
  $scope.getUserInput = function(){
    console.log("in getuserinput " + $scope.aliasIn + " " + $scope.firstNameIn + " " + $scope.lastNameIn + " " +  $scope.cityIn + " " +  $scope.powerNameIn);
    // create hero object to send
    var heroIn = {
      alias: $scope.aliasIn,
      first_name: $scope.firstNameIn,
      last_name: $scope.lastNameIn,
      city: $scope.cityIn,
      power_name: $scope.powerNameIn
    };
      //clear the form after creating object
      $scope.aliasIn='';
      $scope.firstNameIn='';
      $scope.lastNameIn='';
      $scope.cityIn='';
      $scope.powerNameIn='';

    $http({
      method: 'POST',
      url: '/heroes',
      data: heroIn
    }).then(refreshPage());
  }; //end getUserInput

  $scope.deleteHero = function(){ //click delete
    var heroId = {
    id: event.target.id
  };
    $http({
      method: 'delete',
      url: '/heroes',
      data: heroId,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then( function mySuccess( response ) {
              refreshPage();
              console.log( response.data ) ;
          }, function myError( response ) {
              console.log( response.statusText ) ;
          });
  };// end delete hero

}]); //end controller

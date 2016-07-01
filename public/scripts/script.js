var myApp = angular.module('myApp', []);

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

}]); //end controller

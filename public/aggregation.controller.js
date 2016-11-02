
var app=angular.module('aggregation',[
    "ngSanitize", 'addLinkForm', 'HubLink']);
app.controller('aggregationController',['$scope','$sce','$http', function($scope,$sce,$http){

    $scope.posts=[];

    $scope.init=function(){
        $scope.loadlink();
    };

    $scope.loadlink=function(){

        $http.get('/api/posts',{
            params:{
                courseId:002
            }
        }).success(function(data){
            $scope.posts=data;
        }).error(function(data){
                console.log(data);
        })
    };

}]);



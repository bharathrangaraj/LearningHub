
var app=angular.module('aggregation',["ui.bootstrap",
    "ngSanitize", 'addLinkForm', 'HubLink']);
app.controller('aggregationController',['$scope','$sce','$http', function($scope,$sce,$http){

    $scope.posts=[];

    $scope.init=function(){
        console.log("init");
        $scope.loadlink();
    };

    $scope.loadlink=function(){

        $http.get('/api/posts',{
            params:{
                courseId:002
            }
        }).success(function(data){
            $scope.posts=data;
            console.log($scope.posts.length);

        }).error(function(data){
                console.log(data);
        })
    };

}]);



/**
 * Created by Bharath on 25/02/16.
 */

var app=angular.module('aggregation',["ngSanitize"]);


app.controller('aggregationController',['$scope','$sce','$http',function($scope,$sce,$http){
    $scope.loading=false;

    $scope.scraped=true;
    $scope.courseId=001;
    $scope.formData={};
    $scope.posts={};
    $scope.scrapelink=function(){

        $scope.loading=true;


        $http.get('/api/scrape', {params:{
            'url':$scope.formData.url
        }}).success(function(data){

                $scope.loading=false;
                $scope.formData.title=data.title;
                $scope.formData.description=data.description;
                $scope.scraped=false;

            }).error(function(data){
                $scope.loading=false;
                console.log(data.errors);
        });
    };



    $scope.addlink=function(){
        $scope.formData.url=$scope.formData.url.replace("watch?v=", "embed/");

        $http.post('/api/add',$scope.formData).success(function(data){
            $scope.formData={};

            $scope.scraped=true;

            $('#Addlink').modal('hide');
            $scope.loadlink();
        }).error(function(){
            $scope.added=true;
            $scope.scraped=true;

        })

    };


    $scope.init=function(){
        $scope.loadlink();
    };






    $scope.loadlink=function(){

        $http.get('/api/posts',{
            params:{
                courseId:001
            }
        }).success(function(data){
            $scope.posts=data;

        }).error(function(data){
            if(error){
                console.log(data);
            }
        })
    }

    $scope.trustsrc=function(url){

          return $sce.trustAsResourceUrl(url);
    }

}]);
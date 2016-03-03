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
                $scope.formData.description=$scope.descriptionValid(data.description);
                $scope.scraped=false;

            }).error(function(data){
                $scope.loading=false;
                console.log(data.errors);
        });
    };
    $scope.addlink=function(){
        $scope.formData.url=$scope.formData.url.replace("watch?v=", "embed/");
        $scope.formData.tags=$scope.validTags($scope.tags);

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
                courseId:1
            }
        }).success(function(data){
            $scope.posts=data;
            $scope.$broadcast('Posts loaded',$scope.posts);

        }).error(function(data){
            if(error){
                console.log(data);
            }
        })
    }

    $scope.trustsrc=function(url){

          return $sce.trustAsResourceUrl(url);
    };


    $scope.descriptionValid=function(data){
        if(data.length>700){
            return data.slice(0,700)+"...";
        }else{
            return data;
        }
    };

    $scope.validTags=function(data){
        return data.split(',');
    };

}]);

app.controller('commentsController',['$scope','$http',function($scope,$http){
    $scope.comment={};



    $scope.$on('Posts loaded',function(event,posts){
        $scope.posts=posts;
    })

    $scope.addComment=function(post){
        $scope.comment.postId=post.postId;
        $scope.comment.userId=1;
        $http.put('/api/comment',$scope.comment).success(function(data){
            console.log(data);

        }).error(function(data){
            console.log(data);
        })
    }

}]);
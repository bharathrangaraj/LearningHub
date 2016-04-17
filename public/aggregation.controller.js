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
    $scope.tags="";
    $scope.current_link_data={};
    $scope.scrapelink=function(){

        $scope.loading=true;


        $http.get('/api/scrape', {params:{
            'url':$scope.formData.url
        }}).success(function(data){
            console.log(data);
            $scope.current_link_data=data;
            $scope.formData.title=data.title;
            if($scope.current_link_data.type==="image" || $scope.current_link_data.type==="audio" || $scope.current_link_data.type==="slide" || $scope.current_link_data.type==="doc" || $scope.current_link_data.type==="pdf" || $scope.current_link_data.type==="story"){
                $scope.des_hide=true;
            }else{
                $scope.des_hide=false;
                $scope.formData.description=$scope.descriptionValid(data.description);
            }//end loading and show the form
                $scope.loading=false;
                $scope.scraped=false;

            }).error(function(data){
                $scope.loading=false;
                console.log(data);
        });
    };
    $scope.addlink=function(){
        if($scope.tags){
            $scope.formData.tags=$scope.validTags($scope.tags);
            $scope.current_link_data.tags=$scope.formData.tags;
        }else{
            $scope.current_link_data.tags="";
        }

        $scope.current_link_data.title=$scope.formData.title;
        if(!$scope.des_hide){
            $scope.formData.description=$scope.descriptionValid($scope.formData.description);
            $scope.current_link_data.description=$scope.formData.description;
        }
        $http.post('/api/add',$scope.current_link_data).success(function(data){
            $scope.formData={};
            $scope.current_link_data={};

            $scope.tags="";
            $scope.des_hide=false;
            $scope.scraped=true;

            $('#Addlink').modal('hide');
            $scope.loadlink();
        }).error(function(err){
            console.log(err);

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

                console.log(data);

        })
    }

    $scope.trustsrc=function(url){

          return $sce.trustAsResourceUrl(url);
    };
    $scope.trustHtml=function(html){
        return $sce.trustAsHtml(html);
    }


    $scope.descriptionValid=function(data){
        if(data.length>700){
            return data.slice(0,600)+"...";
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
        $scope.comment.userName="bharath";

        $http.put('/api/comment',$scope.comment).success(function(data){
            console.log(data);

        }).error(function(data){
            console.log(data);
        })
    }

}]);
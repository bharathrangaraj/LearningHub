/**
 * Created by Bharath on 24/10/2016.
 */
 var addLinkForm = angular.module('addLinkForm', [])
     .directive("addLink", function(){
        return {
            restrict: 'E',
            templateUrl: './templates/LinkForm/addLink.html'
        }
    }).controller("addLinkController",[ '$scope', '$http', function ($scope, $http){

    $scope.loading=false;
    $scope.scraped=true;
    $scope.courseId=001;
    $scope.formData={
        'url':"",
        'title':"",
        'description':"",
        'tags':[]
    };

    /**
     * funciton to scrape the link
     * @param isValid
     * @param form
     */
    $scope.scrapelink=function(isValid,form){
        if(isValid){
            $scope.loading=true;
            $http.get('/api/scrape', {params:{
                'url':$scope.formData.url
            }}).success( function (data)  {
                //check data for error
                if(data=="invalid link"){
                    $scope.loading=false;
                    form.$setPristine(true);
                    $scope.linkInvalid=true;
                }else{
                    $scope.linkInvalid=false;
                    if(data){
                        $scope.current_link_data=data;
                    }
                    if(data.title){
                        $scope.formData.title=data.title;
                    }
                    if(data.description){
                        $scope.formData.description=$scope.descriptionValid(data.description);
                    }
                    //show or hide description
                    if($scope.current_link_data.type==="image" || $scope.current_link_data.type==="audio" || $scope.current_link_data.type==="slide" || $scope.current_link_data.type==="doc" || $scope.current_link_data.type==="pdf" || $scope.current_link_data.type==="story"){
                        $scope.des_hide=true;
                    }else{
                        $scope.des_hide=false;
                    }
                    //end loading and show the form
                    $scope.loading=false;
                    $scope.scraped=false;
                }
            }).error( function (data) {
                $scope.loading=false;
                console.log(data);
            });
        }

    };

    /**
     * function to reset the form
     */

    $scope.reset=function(form1,form2){
        $scope.formData={
            'url':"",
            'title':"",
            'description':"",
            'tags':[]
        };
        form1.$setPristine(true);
        form2.$setPristine(true);
        $scope.scraped=true;

    };

    /**
     *function to add tje scraped link to the database
     * @param isValid
     */

    $scope.addlink= function (isValid) {
        if($scope.tags) {
            $scope.formData.tags=$scope.validTags($scope.tags);
            $scope.current_link_data.tags=$scope.formData.tags;
        }else {
            $scope.current_link_data.tags="";
        }

        $scope.current_link_data.title=$scope.formData.title;
        if (!$scope.des_hide) {
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
            window.reload();
        }).error(function(err){
            console.log(err);
            $scope.reset()
        });
        $scope.reset($scope.aggregateData,$scope.aggregateUrl);
    };

    /**
     *
     * @param data
     * @returns {Array|*}
     */
    $scope.validTags=function(data){
        return data.split(',');
    };

}]);


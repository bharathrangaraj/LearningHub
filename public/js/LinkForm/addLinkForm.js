/**
 * Created by Bharath on 24/10/2016.
 */
 var addLinkForm = angular.module('addLinkForm', ['ngTagsInput'])
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
        'type': "",
        'description':"",
        'tags':[],
        'userId' : 1
    };
    $scope.unformattedtags = [];
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
                    $scope.formData.url = data.url;
                    if(data.type){
                        $scope.formData.type = data.type;
                    }
                    if(data.title){
                        $scope.formData.title=data.title;
                    }
                    if(data.description){
                        $scope.formData.description=$scope.descriptionValid(data.description);
                    }
                    //show or hide description
                    if(data.type==="image" || data.type==="audio" || data.type==="slide" || data.type==="doc" || data.type==="pdf" || data.type==="story"){
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

        //util methods
        $scope.descriptionValid=function(description){
            if(description.length>700){
                return description.slice(0,600)+"...";
            }else{
                return description;
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

        if($scope.unformattedtags) {
            $scope.formData.tags = $scope.validTags($scope.unformattedtags);
        }

        if (!$scope.des_hide) {
            $scope.formData.description=$scope.descriptionValid($scope.formData.description);
        }
        console.log($scope.formData);
        $http.post('/api/add',$scope.formData).success(function (data){
            $scope.unformattedtags="";
            $scope.des_hide=false;
            $scope.scraped=true;
            $('#Addlink').modal('hide');
            window.location.reload();
        }).error( function(err){
            console.log(err);
            $scope.reset();
            $('#Addlink').modal('hide');
        });

        $scope.reset($scope.aggregateData,$scope.aggregateUrl);
    };

    /**
     *
     * @param unformattedTags
     * @returns {Array|*}
     */
    $scope.validTags=function(unformattedTags){
        console.log(unformattedTags);
        var formattedTags = [];
        Object.keys(unformattedTags).forEach(function(tag){
            formattedTags.push(unformattedTags[tag].text)
        });
        console.log(formattedTags);
        return formattedTags;
    };

}]);



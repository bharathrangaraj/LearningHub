/**
 * Created by Bharath on 30/10/2016.
 */
var HubLink = angular.module('HubLink', ['HubPostDelete', 'toaster'] )
    .controller( 'HubLinkController', [ '$scope', '$sce','$http', 'toaster', function ($scope, $sce, $http, toaster) {

        // view data preparation
        var vm = this;
        vm.post.url = $sce.trustAsResourceUrl(vm.post.url);
        vm.owner = (vm.post.userId == 1);
        //delete methods
        vm.delete = function(){
            console.log('click');
            $('#deletePost').modal('show');
        };

        vm.confirmDelete = function(){
            console.log(vm.post.postId);
            $http.delete('/api/delete',
                {
                    params:{
                        'postId' : vm.post.postId
                    }
                })
                .success( function(data){
                    console.log('deleted');
                    $('#deletePost').modal('hide');
                    toaster.pop( 'success', "Successfully Deleted", vm.post.title);
                    window.location.reload();
                })
                .error( function(data){
                    console.log('error');
                    $('#deletePost').modal('hide');
                    toaster.pop( 'error', "Error in deleting", vm.post.title);
                    window.location.reload();
                });
        };

        vm.deleteClose = function(){
            $('#deletePost').modal('hide');
        }

    }] )
    .directive( 'hubLink', function () {
        var setTemplate = function (postType) {
            var templateUrl = './templates/HubLink/hubvideo.html';
            switch (postType) {
                case 'video':
                    templateUrl = './templates/HubLink/hubvideo.html';
                    break;

            }
            return templateUrl;
        };
        return {
            restrict: 'E',
            bindToController: true,
            controller: "HubLinkController as vm",
            scope: {
                post: '='
            },
            link: function (scope) {
               scope.templateUrl = setTemplate(scope.vm.post.type);
            },
            template: "<div ng-include='templateUrl'></div>"
        };
    });


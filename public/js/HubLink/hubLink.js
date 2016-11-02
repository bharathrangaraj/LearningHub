/**
 * Created by Bharath on 30/10/2016.
 */
var HubLink = angular.module('HubLink', [ 'ui.bootstrap','HubPostDelete', 'HubPostEdit', 'toaster'] )
    .directive( 'hubLink', function () {
        var setTemplate = function (postType) {
            var templateUrl = './templates/HubLink/hubvideo.html';
            switch (postType) {
                case 'video':
                    templateUrl = './templates/HubLink/hubvideo.html';
                    break;
                case 'pdf':
                    templateUrl = './templates/HubLink/hubpdf.html';
                    break;
                case 'slide':
                    templateUrl = './templates/HubLink/hubslide.html';
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
    })
    .controller( 'HubLinkController', [ '$rootScope', '$scope', '$sce','$http', 'toaster', '$uibModal', function ($rootScope,$scope, $sce, $http, toaster, $uibModal) {

        // view data preparation
        var vm = this;
        vm.post.url = $sce.trustAsResourceUrl(vm.post.url);
        vm.owner = (vm.post.userId == 1);
        if(vm.post.embedHtml){
            vm.post.embedHtml = $sce.trustAsHtml(vm.post.embedHtml);
        }

        //edit methods
        vm.edit = function(){
            var instance = $uibModal.open({
                templateUrl: '/templates/HubLink/hubPostEdit.html',
                scope: $scope, //passed current scope to the modal
                size: 'lg'
            });
        };

        vm.confirmEdit = function(post){
            post.tags = vm.validTags(post.tags);
            console.log(post.tags);
            $http.post('/api/edit',
                post)
                .success( function(data){
                    console.log('edited');
                    $('#editPost').modal('hide');
                    toaster.pop( 'success', "Successfully Edited", vm.post.title);
                    window.location.reload();
                })
                .error( function(data){
                    console.log('error');
                    $('#EditPost').modal('hide');
                    toaster.pop( 'error', "Error in Editing", vm.post.title);
                    window.location.reload();
                });

        };

        vm.validTags=function(unformattedTags){
            var formattedTags = [];
            Object.keys(unformattedTags).forEach(function(tag){
                formattedTags.push(unformattedTags[tag].text)
            });
            return formattedTags;
        };

        //delete methods
        vm.delete = function(post){
            var instance = $uibModal.open({
                templateUrl: '/templates/HubLink/hubPostDelete.html',
                scope: $scope, //passed current scope to the modal
                size: 'lg'
            });
        };

        vm.confirmDelete = function(postId){
            console.log(vm.post.postId);
            $http.delete('/api/delete',
                {
                    params:{
                        'postId' : postId
                    }
                })
                .success( function(data){
                    console.log('deleted');
                    toaster.pop( 'success', "Successfully Deleted", vm.post.title);
                    window.location.reload();
                })
                .error( function(data){
                    //console.log('error');
                    //$('#deletePost').modal('hide');
                    toaster.pop( 'error', "Error in deleting", vm.post.title);
                    window.location.reload();
                });
        };

        vm.deleteClose = function(){
            $('#deletePost').modal('hide');
        }

    }] );


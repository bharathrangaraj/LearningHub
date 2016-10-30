/**
 * Created by Bharath on 30/10/2016.
 */
var HubLink = angular.module('HubLink', [])
    .controller( 'HubLinkController', [ '$scope', '$sce',function ($scope, $sce) {
        var vm = this;
        vm.post.url = $sce.trustAsResourceUrl(vm.post.url);
        if(vm.post.description){
            vm.post.description = descriptionValid(vm.post.description);
        }



        descriptionValid=function(description){
            if(description.length>700){
                return description.slice(0,600)+"...";
            }else{
                return description;
            }
        };

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


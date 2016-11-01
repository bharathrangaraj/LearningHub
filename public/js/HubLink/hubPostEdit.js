/**
 * Created by Bharath on 01/11/2016.
 */
var HubPostEdit = angular.module('HubPostEdit', [])
    .directive('hubPostEdit', function() {
        return {
            restrict: 'E',
            templateUrl: './templates/HubLink/hubPostEdit.html'
        }
    });

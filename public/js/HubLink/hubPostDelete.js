/**
 * Created by Bharath on 31/10/2016.
 */
var HubPostDelete = angular.module('HubPostDelete', [])
    .directive('hubPostDelete', function () {
        return {
            restrict:'E',
            templateUrl: './templates/HubLink/hubPostDelete.html'
        }
    });

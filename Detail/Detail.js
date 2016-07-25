/**
 * Created by avinash.sachdewani on 7/11/2016.
 */
angular.module('detail', [])
    .controller('detailsCtrl',['$scope', '$routeParams','myAppService',function($scope, $routeParams,myAppService)
    {
        $scope.product = GetProductById($routeParams.productId);

        function GetProductById(id){
            return myAppService.getProduct(id);
        }

    }]);

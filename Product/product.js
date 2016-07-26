/**
 * Created by avinash.sachdewani on 7/11/2016.
 */
angular.module('product',[]).
    controller('productCtrl',['$scope','$http','myAppService','$window','$routeParams','$location',
        function($scope, $http, myAppService, $window, $routeParams, $location) {
        //var product = {};
        $scope.sortType     = 'id';
        $scope.sortReverse  = false;

        $scope.Products=GetProducts();

        $scope.submit = function(product) {
            myAppService.saveProduct(product);
            //var req = {
            //    method: 'POST',
            //    url: 'http://demo6450848.mockable.io/saveproduct',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    data: product
            //}
            //
            //$http(req)
            //    .then(function(response)
            //    {
            //        console.log(response.data);
            //        $scope.Products =  response.data;
            //    }, function (error) {
            //
            //    });
            //$window.location.href = '#index';
            $location.path('/index');
        };
        $scope.saveProducts = function(products){
            for(var i in products){
                if(products[i]){
                    products[i].IsEditable=false;
                }
                myAppService.saveProduct(products[i]);
            }
        };
        $scope.product = GetProductById($routeParams.productId);

        $scope.getNumber = function(num) {
            return new Array(num);
        }
        $scope.Back= function () {
            //$window.location.href = '#index';
            $location.path('index');
        }
        $scope.saveRating = function(productId,rating){
            myAppService.saveRating(productId,rating);
        }
        $scope.addRow = function(){
            var products = $scope.Products;
                $scope.Products.push({
                    "id": null,
                    "Name": "",
                    "Cost": 0,
                    "TotalRating": 5,
                    "Rating": 0,
                    "IsEditable":true
                });
        }
        $scope.deleteRow = function(index){
            $scope.Products.splice(index, 1);
        }
        $scope.$watch('sortReverse', function() {

        });
        $scope.editRow = function(productId){
            var products=$scope.Products;
            for (var i in products) {
                if (products[i].id == productId) {
                    products[i].IsEditable=!products[i].IsEditable;
                    return;
                }
            }
        }
        function GetProducts(){
            //$http.get("http://demo6450848.mockable.io/products")
            //    .then(function(response)
            //    {
            //        console.log(response);
            //        $scope.Products =  response.data;
            //    }, function (error) {
            //        console.log(error);
            //    });
            return myAppService.list();
        };
        function GetProductById(id){
            if(id){
                return myAppService.getProduct(id);
            }

        };
    }])
    .controller('directiveCtrl',['$scope','myAppService',
        function ($scope,myAppService) {
            $scope.sortReverse  = false;
            $scope.Products = myAppService.list();
    }])
    .directive('prdouctDirective', function () {
        return {
            restrict:'EA',
            //scope :{
            //    title: '@',
            //    check:'='
            //},
            //template: '<div>Name: Avinash<br />{{title}}</div>',
            templateUrl: 'Product/producttable.html',
            controller: 'directiveCtrl',
            link: function ($scope, element, attrs) {

            },
            replace:true
        };
    });
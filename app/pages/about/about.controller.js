
class AboutController {
    constructor($scope){
        this.title = "title";
        $scope.title = "scopeTitle";
    }
}

AboutController.$inject = ["$scope"];


angular.module("TestApp.about")
    .controller("AboutController", AboutController);

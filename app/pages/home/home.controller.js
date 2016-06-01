
class homeController {
    constructor(TestService){
        this.test();
        this.str = TestService.getStr();
    }

    test(){
        this.title = "title";
    }
}

homeController.$inject = ["TestService"];

angular.module('TestApp.home')
    .controller('HomeController', homeController);


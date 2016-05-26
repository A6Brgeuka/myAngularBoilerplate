(function () {

    angular
        .module("blocks.router")
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/pages/home/home.html",
                controller: "HomeController as vm"
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/pages/about/about.html",
                controller: "AboutController as vm"
            });

        $urlRouterProvider.otherwise('/')
    }
})();

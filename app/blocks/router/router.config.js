(function () {

    angular
        .module("blocks.router")
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "public/assets/templates/pages/home/home.html",
                controller: "HomeController as vm"
            })
            .state("about", {
                url: "/about",
                templateUrl: "public/assets/templates/pages/about/about.html",
                controller: "AboutController as vm"
            });

        $urlRouterProvider.otherwise('/')
    }
})();

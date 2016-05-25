(() => {
    angular.module("TestApp.home")
        .controller("HomeController", homeController);

    homeController.$inject = [];

    function homeController() {

        const vm = this;

        activate();

        function activate(){
            const title = "HOME";
            vm.title = title;
        }

    }
})();

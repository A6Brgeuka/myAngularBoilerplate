(function () {
    angular.module("blocks.services")
        .factory("TestService", testService);

    testService.$inject = ["$q"];

    function testService($q) {

        var service = {
            getItems: getItems,
            getItemsPromise: getItemsPromise,
            getItem: getItem
        };

        var items = [
            { "text": "azaza",  "value": 1 },
            { "text": "ololo",  "value": 2 },
            { "text": "fuck",   "value": 3 }
        ];

        return service;

        function getItems(){
            return items;
        }

        function getItemsPromise(){
            var deferred = $q.defer();
            deferred.resolve(items);
            //deffered.reject("error");
            return deferred.promise;
        }

        function getItem(index){
            return items[index];
        }

    }
})();

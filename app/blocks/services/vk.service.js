( () => {
    angular.module("blocks.services")
        .factory('vkApi', vkApi);

    vkApi.$inject = ["$http"];

    function vkApi($http) {

        const service = {
            getWalls
        };

        return service;

        function getWalls() {
            const methodName = 'groups.getMembers';
            const groupID = 76922753;
            const url = 'https://api.vk.com/method/'+methodName+'?group_id='+groupID+'&callback=JSON_CALLBACK';

            return $http.jsonp(url).success();
        }
    }
});
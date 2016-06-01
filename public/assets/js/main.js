"use strict";

(function () {
    angular.module("TestApp", ["TestApp.core",
    //pages
    "TestApp.home", "TestApp.about"]);
})();
"use strict";

(function () {
    angular.module("TestApp.blocks", ["blocks.services", "blocks.constants", "blocks.helpers", "blocks.router"]);
})();
"use strict";

(function () {
    angular.module("TestApp.core", [
    //angular native modules + third party modules
    //..
    //cross-app module
    "TestApp.blocks"]);
})();
"use strict";

(function () {
    angular.module("blocks.constants", []);
})();
"use strict";

(function () {
    angular.module("blocks.helpers", []);
})();
"use strict";

(function () {
    angular.module("blocks.router", ["ui.router"]);
})();
"use strict";

(function () {
    angular.module("blocks.services", []);
})();
"use strict";

(function () {
    angular.module("TestApp.home", []);
})();
"use strict";

(function () {
    angular.module("TestApp.about", []);
})();
"use strict";

(function () {
    'use strict';

    angular.module("TestApp").config(config);

    config.$inject = [];

    function config() {}
})();
"use strict";

(function () {
    angular.module("TestApp.core").controller("CoreController", coreController);

    coreController.$inject = [];

    function coreController() {
        var vm = this;

        vm.test = "test";
    }
})();
'use strict';

(function () {
    angular.module("blocks.constants").constant('EVENTS', {
        SIGN_IN: 'sign_in',
        SIGN_OUT: 'sign_out',
        SIGN_UP: 'sign_up'
    }).constant('ERROR_CODES', {
        NOT_FOUND: "Not found!",
        UNKNOWN: "Just unknown error!"
    });
})();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
    angular.module("blocks.helpers").factory("helper", helper);

    helper.$inject = [];

    function helper() {

        var service = {
            toLowerCase: toLowerCase,
            toCamelCase: toCamelCase,
            toPascalCase: toPascalCase,
            parseDate: parseDate,
            prettyDate: prettyDate,
            preventClick: preventClick,
            excapeString: excapeString
        };

        return service;

        function toLowerCase(target) {
            if (typeof target == "string") {
                return target.toLowerCase();
            }
            if ((typeof target === "undefined" ? "undefined" : _typeof(target)) == "object") {
                return _.transform(target, function (result, value, key) {
                    delete result[key];
                    result[key.toLowerCase()] = value;
                });
            }
            return target;
        };

        function toCamelCase(target) {
            if (typeof target == "string") {
                return target.substring(0, 1).toLowerCase() + target.substring(1);
            }
            if ((typeof target === "undefined" ? "undefined" : _typeof(target)) == "object") {
                return _.transform(target, function (result, value, key) {
                    delete result[key];
                    var newKey = key.substring(0, 1).toLowerCase() + key.substring(1);
                    result[newKey] = value;
                });
            }
            return target;
        }

        function toPascalCase(target) {
            if (!target) return null;
            if (typeof target == "string") {
                return target.substring(0, 1).toUpperCase() + target.substring(1);
            }
            if ((typeof target === "undefined" ? "undefined" : _typeof(target)) == "object") {
                return _.transform(target, function (result, value, key) {
                    delete result[key];
                    var newKey = key.substring(0, 1).toUpperCase() + key.substring(1);
                    result[newKey] = value;
                });
            }
            return target;
        }

        function parseDate(date) {
            if (angular.isString(date)) {
                return date.length === 10 ? moment(date, "DD.MM.YYYY") : moment(date);
            }
            if (angular.isNumber(date)) {
                return new Date(date);
            }
            return date;
        }

        function prettyDate(date) {
            if (!date) return date;
            return parseDate(date).format("DD.MM.YYYY");
        }

        function preventClick(func) {
            return function () {
                var args = Array.prototype.slice.call(arguments);
                if (args.length) {
                    var event = args[0];
                    if (event && event.originalEvent && event.originalEvent instanceof MouseEvent) {
                        event.preventDefault();
                        event.stopPropagation();
                        args.splice(0, 1);
                    }
                }
                if (angular.isFunction(func)) {
                    func.apply(this, args);
                }
            };
        }

        function excapeString(string) {
            if (!string || !string.length) return string;
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
    };
})();
"use strict";

(function () {

    angular.module("blocks.router").config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/",
            templateUrl: "app/pages/home/home.html",
            controller: "HomeController as vm"
        }).state("about", {
            url: "/about",
            templateUrl: "app/pages/about/about.html",
            controller: "AboutController as vm"
        });

        $urlRouterProvider.otherwise('/');
    }
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var testService = function () {
    function testService($q) {
        _classCallCheck(this, testService);

        this.q = $q;

        this.items = [{ "text": "azaza", "value": 1 }, { "text": "ololo", "value": 2 }, { "text": "fuck", "value": 3 }];
    }

    _createClass(testService, [{
        key: "getStr",
        value: function getStr() {
            return "test";
        }
    }, {
        key: "getItems",
        value: function getItems() {
            return this.items;
        }
    }, {
        key: "getItemsPromise",
        value: function getItemsPromise() {
            var deferred = this.q.defer();
            deferred.resolve(this.items);
            //deffered.reject("error");
            return deferred.promise;
        }
    }, {
        key: "getItem",
        value: function getItem(index) {
            return this.items[index];
        }
    }]);

    return testService;
}();

testService.$inject = ["$q"];

angular.module("blocks.services").factory("TestService", function () {
    return new testService();
});
"use strict";

(function () {
    angular.module("blocks.services").factory('vkApi', vkApi);

    vkApi.$inject = ["$http"];

    function vkApi($http) {

        var service = {
            getWalls: getWalls
        };

        return service;

        function getWalls() {
            var methodName = 'groups.getMembers';
            var groupID = 76922753;
            var url = 'https://api.vk.com/method/' + methodName + '?group_id=' + groupID + '&callback=JSON_CALLBACK';

            return $http.jsonp(url).success();
        }
    }
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var homeController = function () {
    function homeController(TestService) {
        _classCallCheck(this, homeController);

        this.test();
        this.str = TestService.getStr();
    }

    _createClass(homeController, [{
        key: "test",
        value: function test() {
            this.title = "title";
        }
    }]);

    return homeController;
}();

homeController.$inject = ["TestService"];

angular.module('TestApp.home').controller('HomeController', homeController);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AboutController = function AboutController($scope) {
    _classCallCheck(this, AboutController);

    this.title = "title";
    $scope.title = "scopeTitle";
};

AboutController.$inject = ["$scope"];

angular.module("TestApp.about").controller("AboutController", AboutController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJibG9ja3MvYmxvY2tzLm1vZHVsZS5qcyIsImNvcmUvY29yZS5tb2R1bGUuanMiLCJibG9ja3MvY29uc3RhbnRzL2NvbnN0YW50cy5tb2R1bGUuanMiLCJibG9ja3MvaGVscGVycy9oZWxwZXJzLm1vZHVsZS5qcyIsImJsb2Nrcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImJsb2Nrcy9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUuanMiLCJwYWdlcy9ob21lL2hvbWUubW9kdWxlLmpzIiwicGFnZXMvYWJvdXQvYWJvdXQubW9kdWxlLmpzIiwiYXBwLmNvbmZpZy5qcyIsImNvcmUvY29yZS5jb250cm9sbGVyLmpzIiwiYmxvY2tzL2NvbnN0YW50cy9jb25zdGFudHMuc2VydmljZS5qcyIsImJsb2Nrcy9oZWxwZXJzL2hlbHBlci5zZXJ2aWNlLmpzIiwiYmxvY2tzL3JvdXRlci9yb3V0ZXIuY29uZmlnLmpzIiwiYmxvY2tzL3NlcnZpY2VzL3Rlc3Quc2VydmljZS5qcyIsImJsb2Nrcy9zZXJ2aWNlcy92ay5zZXJ2aWNlLmpzIiwicGFnZXMvaG9tZS9ob21lLmNvbnRyb2xsZXIuanMiLCJwYWdlcy9hYm91dC9hYm91dC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxZQUFZO0FBQ1QsWUFBUSxNQUFSLENBQWUsU0FBZixFQUEwQixDQUN0QixjQURzQjs7QUFHdEIsa0JBSHNCLEVBSXRCLGVBSnNCLENBQTFCO0FBTUgsQ0FQRDs7O0FDQUEsQ0FBQyxZQUFZO0FBQ1QsWUFBUSxNQUFSLENBQWUsZ0JBQWYsRUFBaUMsQ0FDN0IsaUJBRDZCLEVBRTdCLGtCQUY2QixFQUc3QixnQkFINkIsRUFJN0IsZUFKNkIsQ0FBakM7QUFNSCxDQVBEOzs7QUNBQSxDQUFDLFlBQVc7QUFDUixZQUFRLE1BQVIsQ0FBZSxjQUFmLEVBQStCOzs7O0FBSTNCLG9CQUoyQixDQUEvQjtBQU1ILENBUEQ7OztBQ0FBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLGtCQUFmLEVBQW1DLEVBQW5DO0FBQ0gsQ0FGRDs7O0FDQUEsQ0FBQyxZQUFZO0FBQ1QsWUFBUSxNQUFSLENBQWUsZ0JBQWYsRUFBaUMsRUFBakM7QUFDSCxDQUZEOzs7QUNBQSxDQUFDLFlBQVk7QUFDVCxZQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLENBQUMsV0FBRCxDQUFoQztBQUNILENBRkQ7OztBQ0FBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLGlCQUFmLEVBQWtDLEVBQWxDO0FBQ0gsQ0FGRDs7O0FDQUEsQ0FBQyxZQUFZO0FBQ1QsWUFBUSxNQUFSLENBQWUsY0FBZixFQUErQixFQUEvQjtBQUNILENBRkQ7OztBQ0FBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsRUFBaEM7QUFDSCxDQUZEOzs7QUNBQSxDQUFDLFlBQVU7QUFDUDs7QUFFQSxZQUNLLE1BREwsQ0FDWSxTQURaLEVBRUssTUFGTCxDQUVZLE1BRlo7O0FBSUEsV0FBTyxPQUFQLEdBQWlCLEVBQWpCOztBQUVBLGFBQVMsTUFBVCxHQUFpQixDQUFFO0FBQ3RCLENBVkQ7OztBQ0FBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLGNBQWYsRUFDSyxVQURMLENBQ2dCLGdCQURoQixFQUNrQyxjQURsQzs7QUFHQSxtQkFBZSxPQUFmLEdBQXlCLEVBQXpCOztBQUVBLGFBQVMsY0FBVCxHQUEwQjtBQUN0QixZQUFJLEtBQUssSUFBVDs7QUFFQSxXQUFHLElBQUgsR0FBVSxNQUFWO0FBQ0g7QUFDSixDQVhEOzs7QUNBQSxDQUFDLFlBQVk7QUFDVCxZQUFRLE1BQVIsQ0FBZSxrQkFBZixFQUNLLFFBREwsQ0FDYyxRQURkLEVBQ3dCO0FBQ2hCLGlCQUFTLFNBRE87QUFFaEIsa0JBQVUsVUFGTTtBQUdoQixpQkFBUztBQUhPLEtBRHhCLEVBTUssUUFOTCxDQU1jLGFBTmQsRUFNNkI7QUFDckIsbUJBQVcsWUFEVTtBQUVyQixpQkFBUztBQUZZLEtBTjdCO0FBVUgsQ0FYRDs7Ozs7QUNBQSxDQUFDLFlBQVk7QUFDVCxZQUFRLE1BQVIsQ0FBZSxnQkFBZixFQUNLLE9BREwsQ0FDYSxRQURiLEVBQ3VCLE1BRHZCOztBQUdBLFdBQU8sT0FBUCxHQUFpQixFQUFqQjs7QUFFQSxhQUFTLE1BQVQsR0FBa0I7O0FBRWQsWUFBSSxVQUFVO0FBQ1YseUJBQWEsV0FESDtBQUVWLHlCQUFhLFdBRkg7QUFHViwwQkFBYyxZQUhKO0FBSVYsdUJBQVcsU0FKRDtBQUtWLHdCQUFZLFVBTEY7QUFNViwwQkFBYyxZQU5KO0FBT1YsMEJBQWM7QUFQSixTQUFkOztBQVVBLGVBQU8sT0FBUDs7QUFFQSxpQkFBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCO0FBQ3pCLGdCQUFJLE9BQU8sTUFBUCxJQUFpQixRQUFyQixFQUErQjtBQUMzQix1QkFBTyxPQUFPLFdBQVAsRUFBUDtBQUNIO0FBQ0QsZ0JBQUksUUFBTyxNQUFQLHlDQUFPLE1BQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDM0IsdUJBQU8sRUFBRSxTQUFGLENBQVksTUFBWixFQUFvQixVQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFBeUIsR0FBekIsRUFBOEI7QUFDckQsMkJBQU8sT0FBTyxHQUFQLENBQVA7QUFDQSwyQkFBTyxJQUFJLFdBQUosRUFBUCxJQUE0QixLQUE1QjtBQUNILGlCQUhNLENBQVA7QUFJSDtBQUNELG1CQUFPLE1BQVA7QUFDSDs7QUFFRCxpQkFBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCO0FBQ3pCLGdCQUFJLE9BQU8sTUFBUCxJQUFpQixRQUFyQixFQUErQjtBQUMzQix1QkFBTyxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsV0FBdkIsS0FBdUMsT0FBTyxTQUFQLENBQWlCLENBQWpCLENBQTlDO0FBQ0g7QUFDRCxnQkFBSSxRQUFPLE1BQVAseUNBQU8sTUFBUCxNQUFpQixRQUFyQixFQUErQjtBQUMzQix1QkFBTyxFQUFFLFNBQUYsQ0FBWSxNQUFaLEVBQW9CLFVBQVUsTUFBVixFQUFrQixLQUFsQixFQUF5QixHQUF6QixFQUE4QjtBQUNyRCwyQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNBLHdCQUFJLFNBQVMsSUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixXQUFwQixLQUFvQyxJQUFJLFNBQUosQ0FBYyxDQUFkLENBQWpEO0FBQ0EsMkJBQU8sTUFBUCxJQUFpQixLQUFqQjtBQUNILGlCQUpNLENBQVA7QUFLSDtBQUNELG1CQUFPLE1BQVA7QUFDSDs7QUFFRCxpQkFBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzFCLGdCQUFJLENBQUMsTUFBTCxFQUFhLE9BQU8sSUFBUDtBQUNiLGdCQUFJLE9BQU8sTUFBUCxJQUFpQixRQUFyQixFQUErQjtBQUMzQix1QkFBTyxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsV0FBdkIsS0FBdUMsT0FBTyxTQUFQLENBQWlCLENBQWpCLENBQTlDO0FBQ0g7QUFDRCxnQkFBSSxRQUFPLE1BQVAseUNBQU8sTUFBUCxNQUFpQixRQUFyQixFQUErQjtBQUMzQix1QkFBTyxFQUFFLFNBQUYsQ0FBWSxNQUFaLEVBQW9CLFVBQVUsTUFBVixFQUFrQixLQUFsQixFQUF5QixHQUF6QixFQUE4QjtBQUNyRCwyQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNBLHdCQUFJLFNBQVMsSUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixXQUFwQixLQUFvQyxJQUFJLFNBQUosQ0FBYyxDQUFkLENBQWpEO0FBQ0EsMkJBQU8sTUFBUCxJQUFpQixLQUFqQjtBQUNILGlCQUpNLENBQVA7QUFLSDtBQUNELG1CQUFPLE1BQVA7QUFDSDs7QUFFRCxpQkFBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCO0FBQ3JCLGdCQUFJLFFBQVEsUUFBUixDQUFpQixJQUFqQixDQUFKLEVBQTRCO0FBQ3hCLHVCQUFPLEtBQUssTUFBTCxLQUFnQixFQUFoQixHQUFxQixPQUFPLElBQVAsRUFBYSxZQUFiLENBQXJCLEdBQWtELE9BQU8sSUFBUCxDQUF6RDtBQUNIO0FBQ0QsZ0JBQUksUUFBUSxRQUFSLENBQWlCLElBQWpCLENBQUosRUFBNEI7QUFDeEIsdUJBQU8sSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFQO0FBQ0g7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsaUJBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN0QixnQkFBSSxDQUFDLElBQUwsRUFBVyxPQUFPLElBQVA7QUFDWCxtQkFBTyxVQUFVLElBQVYsRUFBZ0IsTUFBaEIsQ0FBdUIsWUFBdkIsQ0FBUDtBQUNIOztBQUVELGlCQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEI7QUFDeEIsbUJBQU8sWUFBWTtBQUNmLG9CQUFJLE9BQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQTJCLFNBQTNCLENBQVg7QUFDQSxvQkFBSSxLQUFLLE1BQVQsRUFBaUI7QUFDYix3QkFBSSxRQUFRLEtBQUssQ0FBTCxDQUFaO0FBQ0Esd0JBQUksU0FBUyxNQUFNLGFBQWYsSUFBZ0MsTUFBTSxhQUFOLFlBQStCLFVBQW5FLEVBQStFO0FBQzNFLDhCQUFNLGNBQU47QUFDQSw4QkFBTSxlQUFOO0FBQ0EsNkJBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmO0FBQ0g7QUFDSjtBQUNELG9CQUFJLFFBQVEsVUFBUixDQUFtQixJQUFuQixDQUFKLEVBQThCO0FBQzFCLHlCQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLElBQWpCO0FBQ0g7QUFDSixhQWJEO0FBY0g7O0FBRUQsaUJBQVMsWUFBVCxDQUFzQixNQUF0QixFQUE4QjtBQUMxQixnQkFBSSxDQUFDLE1BQUQsSUFBVyxDQUFDLE9BQU8sTUFBdkIsRUFBK0IsT0FBTyxNQUFQO0FBQy9CLGdCQUFJLFlBQVk7QUFDWixxQkFBSyxPQURPO0FBRVoscUJBQUssTUFGTztBQUdaLHFCQUFLLE1BSE87QUFJWixxQkFBSyxRQUpPO0FBS1oscUJBQUssT0FMTztBQU1aLHFCQUFLO0FBTk8sYUFBaEI7O0FBU0EsbUJBQU8sT0FBTyxNQUFQLEVBQWUsT0FBZixDQUF1QixZQUF2QixFQUFxQyxVQUFVLENBQVYsRUFBYTtBQUNyRCx1QkFBTyxVQUFVLENBQVYsQ0FBUDtBQUNILGFBRk0sQ0FBUDtBQUdIO0FBQ0o7QUFDSixDQTlHRDs7O0FDQUEsQ0FBQyxZQUFZOztBQUVULFlBQ0ssTUFETCxDQUNZLGVBRFosRUFFSyxNQUZMLENBRVksTUFGWjs7QUFJQSxXQUFPLE9BQVAsR0FBaUIsQ0FBQyxnQkFBRCxFQUFtQixvQkFBbkIsQ0FBakI7O0FBRUEsYUFBUyxNQUFULENBQWdCLGNBQWhCLEVBQWdDLGtCQUFoQyxFQUFvRDtBQUNoRCx1QkFDSyxLQURMLENBQ1csTUFEWCxFQUNtQjtBQUNYLGlCQUFLLEdBRE07QUFFWCx5QkFBYSwwQkFGRjtBQUdYLHdCQUFZO0FBSEQsU0FEbkIsRUFNSyxLQU5MLENBTVcsT0FOWCxFQU1vQjtBQUNaLGlCQUFLLFFBRE87QUFFWix5QkFBYSw0QkFGRDtBQUdaLHdCQUFZO0FBSEEsU0FOcEI7O0FBWUEsMkJBQW1CLFNBQW5CLENBQTZCLEdBQTdCO0FBQ0g7QUFDSixDQXZCRDs7Ozs7OztJQ0NNO0FBRUYseUJBQVksRUFBWixFQUFlO0FBQUE7O0FBQ1gsYUFBSyxDQUFMLEdBQVMsRUFBVDs7QUFFQSxhQUFLLEtBQUwsR0FBYSxDQUNULEVBQUUsUUFBUSxPQUFWLEVBQW9CLFNBQVMsQ0FBN0IsRUFEUyxFQUVULEVBQUUsUUFBUSxPQUFWLEVBQW9CLFNBQVMsQ0FBN0IsRUFGUyxFQUdULEVBQUUsUUFBUSxNQUFWLEVBQW9CLFNBQVMsQ0FBN0IsRUFIUyxDQUFiO0FBS0g7Ozs7aUNBRU87QUFDSixtQkFBTyxNQUFQO0FBQ0g7OzttQ0FFUztBQUNOLG1CQUFPLEtBQUssS0FBWjtBQUNIOzs7MENBRWdCO0FBQ2IsZ0JBQU0sV0FBVyxLQUFLLENBQUwsQ0FBTyxLQUFQLEVBQWpCO0FBQ0EscUJBQVMsT0FBVCxDQUFpQixLQUFLLEtBQXRCOztBQUVBLG1CQUFPLFNBQVMsT0FBaEI7QUFDSDs7O2dDQUVPLE9BQU87QUFDWCxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQVA7QUFDSDs7Ozs7O0FBS0wsWUFBWSxPQUFaLEdBQXNCLENBQUMsSUFBRCxDQUF0Qjs7QUFFQSxRQUFRLE1BQVIsQ0FBZSxpQkFBZixFQUNLLE9BREwsQ0FDYSxhQURiLEVBQzRCO0FBQUEsV0FBTSxJQUFJLFdBQUosRUFBTjtBQUFBLENBRDVCOzs7QUNyQ0EsQ0FBRSxZQUFNO0FBQ0osWUFBUSxNQUFSLENBQWUsaUJBQWYsRUFDSyxPQURMLENBQ2EsT0FEYixFQUNzQixLQUR0Qjs7QUFHQSxVQUFNLE9BQU4sR0FBZ0IsQ0FBQyxPQUFELENBQWhCOztBQUVBLGFBQVMsS0FBVCxDQUFlLEtBQWYsRUFBc0I7O0FBRWxCLFlBQU0sVUFBVTtBQUNaO0FBRFksU0FBaEI7O0FBSUEsZUFBTyxPQUFQOztBQUVBLGlCQUFTLFFBQVQsR0FBb0I7QUFDaEIsZ0JBQU0sYUFBYSxtQkFBbkI7QUFDQSxnQkFBTSxVQUFVLFFBQWhCO0FBQ0EsZ0JBQU0sTUFBTSwrQkFBNkIsVUFBN0IsR0FBd0MsWUFBeEMsR0FBcUQsT0FBckQsR0FBNkQseUJBQXpFOztBQUVBLG1CQUFPLE1BQU0sS0FBTixDQUFZLEdBQVosRUFBaUIsT0FBakIsRUFBUDtBQUNIO0FBQ0o7QUFDSixDQXRCRDs7Ozs7OztJQ0NNO0FBQ0YsNEJBQVksV0FBWixFQUF3QjtBQUFBOztBQUNwQixhQUFLLElBQUw7QUFDQSxhQUFLLEdBQUwsR0FBVyxZQUFZLE1BQVosRUFBWDtBQUNIOzs7OytCQUVLO0FBQ0YsaUJBQUssS0FBTCxHQUFhLE9BQWI7QUFDSDs7Ozs7O0FBR0wsZUFBZSxPQUFmLEdBQXlCLENBQUMsYUFBRCxDQUF6Qjs7QUFFQSxRQUFRLE1BQVIsQ0FBZSxjQUFmLEVBQ0ssVUFETCxDQUNnQixnQkFEaEIsRUFDa0MsY0FEbEM7Ozs7O0lDYk0sa0JBQ0YseUJBQVksTUFBWixFQUFtQjtBQUFBOztBQUNmLFNBQUssS0FBTCxHQUFhLE9BQWI7QUFDQSxXQUFPLEtBQVAsR0FBZSxZQUFmO0FBQ0g7O0FBR0wsZ0JBQWdCLE9BQWhCLEdBQTBCLENBQUMsUUFBRCxDQUExQjs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQ0ssVUFETCxDQUNnQixpQkFEaEIsRUFDbUMsZUFEbkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlRlc3RBcHBcIiwgW1xyXG4gICAgICAgIFwiVGVzdEFwcC5jb3JlXCIsXHJcbiAgICAgICAgLy9wYWdlc1xyXG4gICAgICAgIFwiVGVzdEFwcC5ob21lXCIsXHJcbiAgICAgICAgXCJUZXN0QXBwLmFib3V0XCIsXHJcbiAgICBdKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiVGVzdEFwcC5ibG9ja3NcIiwgW1xyXG4gICAgICAgIFwiYmxvY2tzLnNlcnZpY2VzXCIsXHJcbiAgICAgICAgXCJibG9ja3MuY29uc3RhbnRzXCIsXHJcbiAgICAgICAgXCJibG9ja3MuaGVscGVyc1wiLFxyXG4gICAgICAgIFwiYmxvY2tzLnJvdXRlclwiXHJcbiAgICBdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlRlc3RBcHAuY29yZVwiLCBbXHJcbiAgICAgICAgLy9hbmd1bGFyIG5hdGl2ZSBtb2R1bGVzICsgdGhpcmQgcGFydHkgbW9kdWxlc1xyXG4gICAgICAgIC8vLi5cclxuICAgICAgICAvL2Nyb3NzLWFwcCBtb2R1bGVcclxuICAgICAgICBcIlRlc3RBcHAuYmxvY2tzXCJcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3MuY29uc3RhbnRzXCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3MuaGVscGVyc1wiLCBbXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvY2tzLnJvdXRlclwiLCBbXCJ1aS5yb3V0ZXJcIl0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5zZXJ2aWNlc1wiLCBbXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiVGVzdEFwcC5ob21lXCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwLmFib3V0XCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcIlRlc3RBcHBcIilcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoKXt9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlRlc3RBcHAuY29yZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKFwiQ29yZUNvbnRyb2xsZXJcIiwgY29yZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGNvcmVDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3JlQ29udHJvbGxlcigpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS50ZXN0ID0gXCJ0ZXN0XCI7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5jb25zdGFudHNcIilcclxuICAgICAgICAuY29uc3RhbnQoJ0VWRU5UUycsIHtcclxuICAgICAgICAgICAgU0lHTl9JTjogJ3NpZ25faW4nLFxyXG4gICAgICAgICAgICBTSUdOX09VVDogJ3NpZ25fb3V0JyxcclxuICAgICAgICAgICAgU0lHTl9VUDogJ3NpZ25fdXAnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY29uc3RhbnQoJ0VSUk9SX0NPREVTJywge1xyXG4gICAgICAgICAgICBOT1RfRk9VTkQ6IFwiTm90IGZvdW5kIVwiLFxyXG4gICAgICAgICAgICBVTktOT1dOOiBcIkp1c3QgdW5rbm93biBlcnJvciFcIlxyXG4gICAgICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5oZWxwZXJzXCIpXHJcbiAgICAgICAgLmZhY3RvcnkoXCJoZWxwZXJcIiwgaGVscGVyKTtcclxuXHJcbiAgICBoZWxwZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhlbHBlcigpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIHRvTG93ZXJDYXNlOiB0b0xvd2VyQ2FzZSxcclxuICAgICAgICAgICAgdG9DYW1lbENhc2U6IHRvQ2FtZWxDYXNlLFxyXG4gICAgICAgICAgICB0b1Bhc2NhbENhc2U6IHRvUGFzY2FsQ2FzZSxcclxuICAgICAgICAgICAgcGFyc2VEYXRlOiBwYXJzZURhdGUsXHJcbiAgICAgICAgICAgIHByZXR0eURhdGU6IHByZXR0eURhdGUsXHJcbiAgICAgICAgICAgIHByZXZlbnRDbGljazogcHJldmVudENsaWNrLFxyXG4gICAgICAgICAgICBleGNhcGVTdHJpbmc6IGV4Y2FwZVN0cmluZ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b0xvd2VyQ2FzZSh0YXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLnRyYW5zZm9ybSh0YXJnZXQsIGZ1bmN0aW9uIChyZXN1bHQsIHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b0NhbWVsQ2FzZSh0YXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzdHJpbmcoMCwgMSkudG9Mb3dlckNhc2UoKSArIHRhcmdldC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8udHJhbnNmb3JtKHRhcmdldCwgZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHRba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0ga2V5LnN1YnN0cmluZygwLCAxKS50b0xvd2VyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbbmV3S2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvUGFzY2FsQ2FzZSh0YXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgdGFyZ2V0LnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy50cmFuc2Zvcm0odGFyZ2V0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXkuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuZXdLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGUpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmxlbmd0aCA9PT0gMTAgPyBtb21lbnQoZGF0ZSwgXCJERC5NTS5ZWVlZXCIpIDogbW9tZW50KGRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzTnVtYmVyKGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwcmV0dHlEYXRlKGRhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRlKSByZXR1cm4gZGF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRGF0ZShkYXRlKS5mb3JtYXQoXCJERC5NTS5ZWVlZXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHJldmVudENsaWNrKGZ1bmMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3Muc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZnVuYykpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBleGNhcGVTdHJpbmcoc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyaW5nIHx8ICFzdHJpbmcubGVuZ3RoKSByZXR1cm4gc3RyaW5nO1xyXG4gICAgICAgICAgICB2YXIgZW50aXR5TWFwID0ge1xyXG4gICAgICAgICAgICAgICAgXCImXCI6IFwiJmFtcDtcIixcclxuICAgICAgICAgICAgICAgIFwiPFwiOiBcIiZsdDtcIixcclxuICAgICAgICAgICAgICAgIFwiPlwiOiBcIiZndDtcIixcclxuICAgICAgICAgICAgICAgICdcIic6ICcmcXVvdDsnLFxyXG4gICAgICAgICAgICAgICAgXCInXCI6ICcmIzM5OycsXHJcbiAgICAgICAgICAgICAgICBcIi9cIjogJyYjeDJGOydcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZShcImJsb2Nrcy5yb3V0ZXJcIilcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZShcImhvbWVcIiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9cIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9wYWdlcy9ob21lL2hvbWUuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJIb21lQ29udHJvbGxlciBhcyB2bVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZShcImFib3V0XCIsIHtcclxuICAgICAgICAgICAgICAgIHVybDogXCIvYWJvdXRcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcImFwcC9wYWdlcy9hYm91dC9hYm91dC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkFib3V0Q29udHJvbGxlciBhcyB2bVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJylcclxuICAgIH1cclxufSkoKTtcclxuIiwiXHJcbmNsYXNzIHRlc3RTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigkcSl7XHJcbiAgICAgICAgdGhpcy5xID0gJHE7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXHJcbiAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiYXphemFcIiwgIFwidmFsdWVcIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwidGV4dFwiOiBcIm9sb2xvXCIsICBcInZhbHVlXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInRleHRcIjogXCJmdWNrXCIsICAgXCJ2YWx1ZVwiOiAzIH1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cigpe1xyXG4gICAgICAgIHJldHVybiBcInRlc3RcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1zUHJvbWlzZSgpe1xyXG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gdGhpcy5xLmRlZmVyKCk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0aGlzLml0ZW1zKTtcclxuICAgICAgICAvL2RlZmZlcmVkLnJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0oaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxudGVzdFNlcnZpY2UuJGluamVjdCA9IFtcIiRxXCJdO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoXCJibG9ja3Muc2VydmljZXNcIilcclxuICAgIC5mYWN0b3J5KFwiVGVzdFNlcnZpY2VcIiwgKCkgPT4gbmV3IHRlc3RTZXJ2aWNlKCkgKTtcclxuIiwiKCAoKSA9PiB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5zZXJ2aWNlc1wiKVxyXG4gICAgICAgIC5mYWN0b3J5KCd2a0FwaScsIHZrQXBpKTtcclxuXHJcbiAgICB2a0FwaS4kaW5qZWN0ID0gW1wiJGh0dHBcIl07XHJcblxyXG4gICAgZnVuY3Rpb24gdmtBcGkoJGh0dHApIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgZ2V0V2FsbHNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0V2FsbHMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSAnZ3JvdXBzLmdldE1lbWJlcnMnO1xyXG4gICAgICAgICAgICBjb25zdCBncm91cElEID0gNzY5MjI3NTM7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9ICdodHRwczovL2FwaS52ay5jb20vbWV0aG9kLycrbWV0aG9kTmFtZSsnP2dyb3VwX2lkPScrZ3JvdXBJRCsnJmNhbGxiYWNrPUpTT05fQ0FMTEJBQ0snO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmpzb25wKHVybCkuc3VjY2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiXHJcbmNsYXNzIGhvbWVDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKFRlc3RTZXJ2aWNlKXtcclxuICAgICAgICB0aGlzLnRlc3QoKTtcclxuICAgICAgICB0aGlzLnN0ciA9IFRlc3RTZXJ2aWNlLmdldFN0cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRlc3QoKXtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJ0aXRsZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5ob21lQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiVGVzdFNlcnZpY2VcIl07XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnVGVzdEFwcC5ob21lJylcclxuICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcclxuXHJcbiIsIlxyXG5jbGFzcyBBYm91dENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlKXtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJ0aXRsZVwiO1xyXG4gICAgICAgICRzY29wZS50aXRsZSA9IFwic2NvcGVUaXRsZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5BYm91dENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiXTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZShcIlRlc3RBcHAuYWJvdXRcIilcclxuICAgIC5jb250cm9sbGVyKFwiQWJvdXRDb250cm9sbGVyXCIsIEFib3V0Q29udHJvbGxlcik7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

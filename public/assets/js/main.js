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
    angular.module("TestApp.about", []);
})();
"use strict";

(function () {
    angular.module("TestApp.home", []);
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

(function () {
    angular.module("blocks.services").factory("TestService", testService);

    testService.$inject = ["$q"];

    function testService($q) {

        var service = {
            getItems: getItems,
            getItemsPromise: getItemsPromise,
            getItem: getItem
        };

        var items = [{ "text": "azaza", "value": 1 }, { "text": "ololo", "value": 2 }, { "text": "fuck", "value": 3 }];

        return service;

        function getItems() {
            return items;
        }

        function getItemsPromise() {
            var deferred = $q.defer();
            deferred.resolve(items);
            //deffered.reject("error");
            return deferred.promise;
        }

        function getItem(index) {
            return items[index];
        }
    }
})();
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

(function () {
    angular.module("TestApp.about").controller("AboutController", aboutController);

    aboutController.$inject = [];

    function aboutController() {

        var vm = this;
    }
})();
"use strict";

(function () {

    angular.module("TestApp.home").config(config);

    config.$inject = [];

    function config() {}
})();
"use strict";

(function () {
    angular.module("TestApp.home").controller("HomeController", homeController);

    homeController.$inject = [];

    function homeController() {

        var vm = this;

        activate();

        function activate() {
            var title = "HOME";
            vm.title = title;
        }
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJibG9ja3MvYmxvY2tzLm1vZHVsZS5qcyIsImNvcmUvY29yZS5tb2R1bGUuanMiLCJibG9ja3MvY29uc3RhbnRzL2NvbnN0YW50cy5tb2R1bGUuanMiLCJibG9ja3MvaGVscGVycy9oZWxwZXJzLm1vZHVsZS5qcyIsImJsb2Nrcy9yb3V0ZXIvcm91dGVyLm1vZHVsZS5qcyIsImJsb2Nrcy9zZXJ2aWNlcy9zZXJ2aWNlcy5tb2R1bGUuanMiLCJwYWdlcy9hYm91dC9hYm91dC5tb2R1bGUuanMiLCJwYWdlcy9ob21lL2hvbWUubW9kdWxlLmpzIiwiYXBwLmNvbmZpZy5qcyIsImNvcmUvY29yZS5jb250cm9sbGVyLmpzIiwiYmxvY2tzL2NvbnN0YW50cy9jb25zdGFudHMuc2VydmljZS5qcyIsImJsb2Nrcy9oZWxwZXJzL2hlbHBlci5zZXJ2aWNlLmpzIiwiYmxvY2tzL3JvdXRlci9yb3V0ZXIuY29uZmlnLmpzIiwiYmxvY2tzL3NlcnZpY2VzL3Rlc3Quc2VydmljZS5qcyIsImJsb2Nrcy9zZXJ2aWNlcy92ay5zZXJ2aWNlLmpzIiwicGFnZXMvYWJvdXQvYWJvdXQuY29udHJvbGxlci5qcyIsInBhZ2VzL2hvbWUvaG9tZS5jb25maWcuanMiLCJwYWdlcy9ob21lL2hvbWUuY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLFNBQWYsRUFBMEIsQ0FDdEIsY0FEc0I7O0FBR3RCLGtCQUhzQixFQUl0QixlQUpzQixDQUExQjtBQU1ILENBUEQ7OztBQ0FBLENBQUMsWUFBWTtBQUNULFlBQVEsTUFBUixDQUFlLGdCQUFmLEVBQWlDLENBQzdCLGlCQUQ2QixFQUU3QixrQkFGNkIsRUFHN0IsZ0JBSDZCLEVBSTdCLGVBSjZCLENBQWpDO0FBTUgsQ0FQRDs7O0FDQUEsQ0FBQyxZQUFXO0FBQ1IsWUFBUSxNQUFSLENBQWUsY0FBZixFQUErQjs7OztBQUkzQixv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akI7O0FBRUEsYUFBUyxNQUFULEdBQWtCLENBRWpCO0FBRUosQ0FWRDs7O0FDQUEsQ0FBQyxZQUFNO0FBQ0gsWUFBUSxNQUFSLENBQWUsY0FBZixFQUNLLFVBREwsQ0FDZ0IsZ0JBRGhCLEVBQ2tDLGNBRGxDOztBQUdBLG1CQUFlLE9BQWYsR0FBeUIsRUFBekI7O0FBRUEsYUFBUyxjQUFULEdBQTBCOztBQUV0QixZQUFNLEtBQUssSUFBWDs7QUFFQTs7QUFFQSxpQkFBUyxRQUFULEdBQW1CO0FBQ2YsZ0JBQU0sUUFBUSxNQUFkO0FBQ0EsZUFBRyxLQUFILEdBQVcsS0FBWDtBQUNIO0FBRUo7QUFDSixDQWxCRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiVGVzdEFwcFwiLCBbXHJcbiAgICAgICAgXCJUZXN0QXBwLmNvcmVcIixcclxuICAgICAgICAvL3BhZ2VzXHJcbiAgICAgICAgXCJUZXN0QXBwLmhvbWVcIixcclxuICAgICAgICBcIlRlc3RBcHAuYWJvdXRcIixcclxuICAgIF0pO1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwLmJsb2Nrc1wiLCBbXHJcbiAgICAgICAgXCJibG9ja3Muc2VydmljZXNcIixcclxuICAgICAgICBcImJsb2Nrcy5jb25zdGFudHNcIixcclxuICAgICAgICBcImJsb2Nrcy5oZWxwZXJzXCIsXHJcbiAgICAgICAgXCJibG9ja3Mucm91dGVyXCJcclxuICAgIF0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiVGVzdEFwcC5jb3JlXCIsIFtcclxuICAgICAgICAvL2FuZ3VsYXIgbmF0aXZlIG1vZHVsZXMgKyB0aGlyZCBwYXJ0eSBtb2R1bGVzXHJcbiAgICAgICAgLy8uLlxyXG4gICAgICAgIC8vY3Jvc3MtYXBwIG1vZHVsZVxyXG4gICAgICAgIFwiVGVzdEFwcC5ibG9ja3NcIlxyXG4gICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5jb25zdGFudHNcIiwgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImJsb2Nrcy5oZWxwZXJzXCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3Mucm91dGVyXCIsIFtcInVpLnJvdXRlclwiXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvY2tzLnNlcnZpY2VzXCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwLmFib3V0XCIsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwLmhvbWVcIiwgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiVGVzdEFwcFwiKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBjb25maWcuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygpe31cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiVGVzdEFwcC5jb3JlXCIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoXCJDb3JlQ29udHJvbGxlclwiLCBjb3JlQ29udHJvbGxlcik7XHJcblxyXG4gICAgY29yZUNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvcmVDb250cm9sbGVyKCkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZtLnRlc3QgPSBcInRlc3RcIjtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvY2tzLmNvbnN0YW50c1wiKVxyXG4gICAgICAgIC5jb25zdGFudCgnRVZFTlRTJywge1xyXG4gICAgICAgICAgICBTSUdOX0lOOiAnc2lnbl9pbicsXHJcbiAgICAgICAgICAgIFNJR05fT1VUOiAnc2lnbl9vdXQnLFxyXG4gICAgICAgICAgICBTSUdOX1VQOiAnc2lnbl91cCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jb25zdGFudCgnRVJST1JfQ09ERVMnLCB7XHJcbiAgICAgICAgICAgIE5PVF9GT1VORDogXCJOb3QgZm91bmQhXCIsXHJcbiAgICAgICAgICAgIFVOS05PV046IFwiSnVzdCB1bmtub3duIGVycm9yIVwiXHJcbiAgICAgICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYmxvY2tzLmhlbHBlcnNcIilcclxuICAgICAgICAuZmFjdG9yeShcImhlbHBlclwiLCBoZWxwZXIpO1xyXG5cclxuICAgIGhlbHBlci4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gaGVscGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZSA9IHtcclxuICAgICAgICAgICAgdG9Mb3dlckNhc2U6IHRvTG93ZXJDYXNlLFxyXG4gICAgICAgICAgICB0b0NhbWVsQ2FzZTogdG9DYW1lbENhc2UsXHJcbiAgICAgICAgICAgIHRvUGFzY2FsQ2FzZTogdG9QYXNjYWxDYXNlLFxyXG4gICAgICAgICAgICBwYXJzZURhdGU6IHBhcnNlRGF0ZSxcclxuICAgICAgICAgICAgcHJldHR5RGF0ZTogcHJldHR5RGF0ZSxcclxuICAgICAgICAgICAgcHJldmVudENsaWNrOiBwcmV2ZW50Q2xpY2ssXHJcbiAgICAgICAgICAgIGV4Y2FwZVN0cmluZzogZXhjYXBlU3RyaW5nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvTG93ZXJDYXNlKHRhcmdldCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8udHJhbnNmb3JtKHRhcmdldCwgZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXN1bHRba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5LnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKHRhcmdldCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnN0cmluZygwLCAxKS50b0xvd2VyQ2FzZSgpICsgdGFyZ2V0LnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy50cmFuc2Zvcm0odGFyZ2V0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlc3VsdFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBrZXkuc3Vic3RyaW5nKDAsIDEpLnRvTG93ZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtuZXdLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9QYXNjYWxDYXNlKHRhcmdldCkge1xyXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQuc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyB0YXJnZXQuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLnRyYW5zZm9ybSh0YXJnZXQsIGZ1bmN0aW9uIChyZXN1bHQsIHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVzdWx0W2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGtleS5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W25ld0tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZURhdGUoZGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUubGVuZ3RoID09PSAxMCA/IG1vbWVudChkYXRlLCBcIkRELk1NLllZWVlcIikgOiBtb21lbnQoZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNOdW1iZXIoZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHByZXR0eURhdGUoZGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGUpIHJldHVybiBkYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VEYXRlKGRhdGUpLmZvcm1hdChcIkRELk1NLllZWVlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwcmV2ZW50Q2xpY2soZnVuYykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gYXJnc1swXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCAmJiBldmVudC5vcmlnaW5hbEV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihmdW5jKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGV4Y2FwZVN0cmluZyhzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJpbmcgfHwgIXN0cmluZy5sZW5ndGgpIHJldHVybiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBlbnRpdHlNYXAgPSB7XHJcbiAgICAgICAgICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxyXG4gICAgICAgICAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxyXG4gICAgICAgICAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxyXG4gICAgICAgICAgICAgICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICAgICAgICAgICAgICBcIidcIjogJyYjMzk7JyxcclxuICAgICAgICAgICAgICAgIFwiL1wiOiAnJiN4MkY7J1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKFwiYmxvY2tzLnJvdXRlclwiKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBjb25maWcuJGluamVjdCA9IFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCJdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKFwiaG9tZVwiLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2hvbWUvaG9tZS5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcIkhvbWVDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKFwiYWJvdXRcIiwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9hYm91dFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2Fib3V0L2Fib3V0Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiQWJvdXRDb250cm9sbGVyIGFzIHZtXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3Muc2VydmljZXNcIilcclxuICAgICAgICAuZmFjdG9yeShcIlRlc3RTZXJ2aWNlXCIsIHRlc3RTZXJ2aWNlKTtcclxuXHJcbiAgICB0ZXN0U2VydmljZS4kaW5qZWN0ID0gW1wiJHFcIl07XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdFNlcnZpY2UoJHEpIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldEl0ZW1zOiBnZXRJdGVtcyxcclxuICAgICAgICAgICAgZ2V0SXRlbXNQcm9taXNlOiBnZXRJdGVtc1Byb21pc2UsXHJcbiAgICAgICAgICAgIGdldEl0ZW06IGdldEl0ZW1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaXRlbXMgPSBbXHJcbiAgICAgICAgICAgIHsgXCJ0ZXh0XCI6IFwiYXphemFcIiwgIFwidmFsdWVcIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwidGV4dFwiOiBcIm9sb2xvXCIsICBcInZhbHVlXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInRleHRcIjogXCJmdWNrXCIsICAgXCJ2YWx1ZVwiOiAzIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SXRlbXMoKXtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SXRlbXNQcm9taXNlKCl7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoaXRlbXMpO1xyXG4gICAgICAgICAgICAvL2RlZmZlcmVkLnJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEl0ZW0oaW5kZXgpe1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIiggKCkgPT4ge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJibG9ja3Muc2VydmljZXNcIilcclxuICAgICAgICAuZmFjdG9yeSgndmtBcGknLCB2a0FwaSk7XHJcblxyXG4gICAgdmtBcGkuJGluamVjdCA9IFtcIiRodHRwXCJdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZrQXBpKCRodHRwKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldFdhbGxzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhbGxzKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRob2ROYW1lID0gJ2dyb3Vwcy5nZXRNZW1iZXJzJztcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBJRCA9IDc2OTIyNzUzO1xyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9hcGkudmsuY29tL21ldGhvZC8nK21ldGhvZE5hbWUrJz9ncm91cF9pZD0nK2dyb3VwSUQrJyZjYWxsYmFjaz1KU09OX0NBTExCQUNLJztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5qc29ucCh1cmwpLnN1Y2Nlc3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlRlc3RBcHAuYWJvdXRcIilcclxuICAgICAgICAuY29udHJvbGxlcihcIkFib3V0Q29udHJvbGxlclwiLCBhYm91dENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGFib3V0Q29udHJvbGxlci4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYWJvdXRDb250cm9sbGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwLmhvbWVcIikuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgY29uZmlnLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbn0pKCk7XHJcbiIsIigoKSA9PiB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlRlc3RBcHAuaG9tZVwiKVxyXG4gICAgICAgIC5jb250cm9sbGVyKFwiSG9tZUNvbnRyb2xsZXJcIiwgaG9tZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGhvbWVDb250cm9sbGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpe1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IFwiSE9NRVwiO1xyXG4gICAgICAgICAgICB2bS50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

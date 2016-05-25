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
    angular.module("TestApp.about", ["TestApp.core"]);
})();
"use strict";

(function () {
    angular.module("TestApp.home", ["TestApp.core"]);
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
        };

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
//# sourceMappingURL=main.js.map

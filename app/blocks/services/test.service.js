
class testService {

    constructor($q){
        this.q = $q;

        this.items = [
            { "text": "azaza",  "value": 1 },
            { "text": "ololo",  "value": 2 },
            { "text": "fuck",   "value": 3 }
        ];
    }

    getStr(){
        return "test";
    }

    getItems(){
        return this.items;
    }

    getItemsPromise(){
        const deferred = this.q.defer();
        deferred.resolve(this.items);
        //deffered.reject("error");
        return deferred.promise;
    }

    getItem(index) {
        return this.items[index];
    }
}



testService.$inject = ["$q"];

angular.module("blocks.services")
    .factory("TestService", () => new testService() );

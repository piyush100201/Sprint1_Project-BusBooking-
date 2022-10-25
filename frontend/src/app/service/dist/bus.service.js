"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var domain = 'http://localhost:4000';
var getSingleBusEndpoint = domain + '/buses/getBusById/';
var createBusEndpoint = domain + '/buses/addBus';
var updateBusEndpoint = domain + '/buses/selectseats/';
var getAllBusEndpoint = domain + '/buses/getAllBus';
var rateBookEndpoint = domain + '/bus/rate/';
var addToFavoritesEndpoint = domain + '/bus/addToFavorites/';
var searchBookEndpoint = domain + '/bus/search';
var BusService = /** @class */ (function () {
    function BusService(http) {
        this.http = http;
        this.headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
    }
    BusService.prototype.createBus = function (payload) {
        return this.http.post(createBusEndpoint, payload);
    };
    BusService.prototype.getSingleBus = function (id) {
        return this.http.get(getSingleBusEndpoint + id);
    };
    BusService.prototype.getAllBus = function () {
        return this.http.get(getAllBusEndpoint);
    };
    BusService.prototype.updateSingleBus = function (id, payload) {
        console.log(payload);
        return this.http.put(updateBusEndpoint + id, payload);
    };
    BusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BusService);
    return BusService;
}());
exports.BusService = BusService;

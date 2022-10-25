"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminBusesComponent = void 0;
// Decorators and Lifehooks
var core_1 = require("@angular/core");
// Forms
var forms_1 = require("@angular/forms");
var AdminBusesComponent = /** @class */ (function () {
    function AdminBusesComponent(router, busService) {
        this.router = router;
        this.busService = busService;
        this.isSubmitted = false;
        this.formSubmitted = false;
        this.formNotSubmitted = true;
        this.busDataArray = [];
        this.submitted = false;
        this.busArray = [];
        this.Types = ['Sleeper', 'Semi-sleeper'];
        this.Cities = ['Delhi', 'Bombay', 'Kolkata', 'Mumbai'];
    }
    AdminBusesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.busNumber = new forms_1.FormControl('', [forms_1.Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$'), forms_1.Validators.required]);
        this.companyName = new forms_1.FormControl('', [forms_1.Validators.minLength(3), forms_1.Validators.required]);
        this.busType = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.startCity = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.destination = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.departDate = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.departTime = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.pricePerSeat = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('[1-9][0-9]{2,3}')]);
        this.seatsRow = new forms_1.FormControl('', [forms_1.Validators.pattern('^[1-9]{1,1}$'), forms_1.Validators.required]);
        this.seatsCol = new forms_1.FormControl('', [forms_1.Validators.pattern('^[1-9]{1,1}$'), forms_1.Validators.required]);
        this.driverName = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.driverNumber = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern('[6-9][0-9]{9}')]);
        this.createBusForm = new forms_1.FormGroup({
            'busNumber': this.busNumber,
            'companyName': this.companyName,
            'busType': this.busType,
            'startCity': this.startCity,
            'destination': this.destination,
            'departDate': this.departDate,
            'departTime': this.departTime,
            'pricePerSeat': this.pricePerSeat,
            'seatsRow': this.seatsRow,
            'seatsCol': this.seatsCol,
            'driverName': this.driverName,
            'driverNumber': this.driverNumber
        });
        this.busService
            .getAllBus()
            .subscribe(function (res) {
            _this.busDataArray = res;
            console.log(res);
        });
        this.busService.getAllBus().subscribe(function () {
            console.log(1);
        });
    };
    AdminBusesComponent.prototype.createBus = function () {
        var _this = this;
        // console.log(this.createBusForm.value);
        this.formSubmitted = true;
        this.formNotSubmitted = false;
        this.isSubmitted = true;
        if (window.confirm("are you sure???")) {
            console.log(this.createBusForm.value);
            this.busService.createBus(this.createBusForm.value).subscribe({
                complete: function () {
                    // this.router.navigateByUrl('/users/authenticate');
                    // console.log('user added successfully')
                    _this.busService
                        .getAllBus()
                        .subscribe(function (res) {
                        _this.busDataArray = res;
                        console.log(res);
                    });
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    };
    AdminBusesComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.createBusForm.value);
    };
    AdminBusesComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-buses',
            templateUrl: './admin-buses.component.html',
            styleUrls: ['./admin-buses.component.css']
        })
    ], AdminBusesComponent);
    return AdminBusesComponent;
}());
exports.AdminBusesComponent = AdminBusesComponent;

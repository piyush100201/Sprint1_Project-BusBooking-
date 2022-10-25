"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminEditBusComponent = void 0;
// Decorators and Lifehooks
var core_1 = require("@angular/core");
// Forms
var forms_1 = require("@angular/forms");
var AdminEditBusComponent = /** @class */ (function () {
    function AdminEditBusComponent(fb, route, busService, router, datePipe) {
        this.fb = fb;
        this.route = route;
        this.busService = busService;
        this.router = router;
        this.datePipe = datePipe;
        this.formSubmitted = false;
        this.formNotSubmitted = true;
        this.busDataArray = [];
        this.submitted = false;
        this.busArray = [];
        this.Types = ['Sleeper', 'Semi-sleeper'];
        this.Cities = ['Delhi', 'Bombay', 'Kolkata', 'Mumbai'];
    }
    AdminEditBusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.busId = this.route.snapshot.paramMap.get('id');
        this.busNumber = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.companyName = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.busType = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.startCity = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.destination = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.departDate = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.departTime = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.pricePerSeat = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.seatsRow = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.seatsCol = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.driverName = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.driverNumber = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.editBusForm = new forms_1.FormGroup({
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
        this.updateBus();
        this.getUser(this.busId);
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
    AdminEditBusComponent.prototype.updateBus = function () {
    };
    AdminEditBusComponent.prototype.getUser = function (id) {
        var _this = this;
        this.busService.getSingleBus(id).subscribe(function (data) {
            console.log(data);
            console.log(data.departDate);
            var setDate = new Date(data.departDate);
            setDate.setDate(setDate.getDate() - 1);
            var x = _this.datePipe.transform(setDate, 'yyyy-MM-dd');
            var time = data.departTime;
            var times = time.split(':');
            var hours = '';
            var min = '0';
            hours = time[0];
            if (time[1])
                min = time[1];
            hours = ("0" + hours).slice(-2);
            min = ("0" + min).slice(-2);
            var str = hours + ':' + min;
            _this.editBusForm.patchValue({
                busNumber: data.busNumber,
                companyName: data.companyName,
                busType: data.busType,
                startCity: data.startCity,
                destination: data.destination,
                departDate: x,
                departTime: str,
                pricePerSeat: data.pricePerSeat,
                seatsRow: data.seatsRow,
                seatsCol: data.seatsCol,
                driverName: data.driver.name,
                driverNumber: data.driver.phoneNumber
            });
        });
    };
    AdminEditBusComponent.prototype.editBus = function () {
        var _this = this;
        console.log(this.editBusForm.value);
        this.formSubmitted = true;
        if (window.confirm("are you sure???")) {
            this.busService.updateSingleBusAll(this.busId, this.editBusForm.value).subscribe({
                complete: function () {
                    _this.router.navigateByUrl('/admin/addbus');
                    console.log('Bus updated successfully....');
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    };
    AdminEditBusComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log(this.editBusForm.value);
        // this.busService
        //   .createBus(this.editBusForm.value)
        //   .subscribe((res) => {
        //     this.router.navigate([`bus/read/${res?.data?._id}`]);
        //   });
    };
    AdminEditBusComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-edit-bus',
            templateUrl: './admin-edit-bus.component.html',
            styleUrls: ['./admin-edit-bus.component.css']
        })
    ], AdminEditBusComponent);
    return AdminEditBusComponent;
}());
exports.AdminEditBusComponent = AdminEditBusComponent;

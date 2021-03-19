"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var applicationuser_1 = require("./applicationuser");
var SystemDetails = /** @class */ (function () {
    function SystemDetails() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], SystemDetails.prototype, "SystemId", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], SystemDetails.prototype, "Licence_No", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], SystemDetails.prototype, "Licence_started", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], SystemDetails.prototype, "Licence_Expiry", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], SystemDetails.prototype, "NoSystem", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], SystemDetails.prototype, "DataStorage", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], SystemDetails.prototype, "UserName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], SystemDetails.prototype, "application_user", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return applicationuser_1.ApplicationUser; }, function (_ApplicationUser) { return applicationuser_1.ApplicationUser; }, {
            eager: true,
            onDelete: "CASCADE"
        }),
        typeorm_1.JoinColumn({ name: "application_user" }),
        __metadata("design:type", applicationuser_1.ApplicationUser)
    ], SystemDetails.prototype, "ApplicationUser", void 0);
    SystemDetails = __decorate([
        typeorm_1.Entity()
    ], SystemDetails);
    return SystemDetails;
}());
exports.SystemDetails = SystemDetails;
//# sourceMappingURL=systemdetails.js.map
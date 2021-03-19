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
var companydetails_1 = require("./companydetails");
var systemdetails_1 = require("./systemdetails");
var ApplicationUser = /** @class */ (function () {
    function ApplicationUser() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ApplicationUser.prototype, "UserId", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "UserName", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "FullName", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "JobRole", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "ContactNo", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "Email", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "UserRole", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "Password", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], ApplicationUser.prototype, "ConfirmPassword", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return companydetails_1.CompanyDetails; }, function (company) { return company.ApplicationUser; }),
        __metadata("design:type", companydetails_1.CompanyDetails)
    ], ApplicationUser.prototype, "CompanyDetails", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return systemdetails_1.SystemDetails; }, function (system) { return system.ApplicationUser; }),
        __metadata("design:type", systemdetails_1.SystemDetails)
    ], ApplicationUser.prototype, "SystemDetails", void 0);
    ApplicationUser = __decorate([
        typeorm_1.Entity()
    ], ApplicationUser);
    return ApplicationUser;
}());
exports.ApplicationUser = ApplicationUser;
//# sourceMappingURL=applicationuser.js.map
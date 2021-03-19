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
var CompanyDetails = /** @class */ (function () {
    function CompanyDetails() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CompanyDetails.prototype, "CompanyId", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "CompanyName", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "CompanyRegistrationNo", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "CompanyAddress", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "PostCode", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "Country", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], CompanyDetails.prototype, "ContactNo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], CompanyDetails.prototype, "application_user", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return applicationuser_1.ApplicationUser; }, function (_ApplicationUser) { return applicationuser_1.ApplicationUser; }, {
            eager: true,
            onDelete: "CASCADE"
        }),
        typeorm_1.JoinColumn({ name: "application_user" }),
        __metadata("design:type", applicationuser_1.ApplicationUser)
    ], CompanyDetails.prototype, "ApplicationUser", void 0);
    CompanyDetails = __decorate([
        typeorm_1.Entity()
    ], CompanyDetails);
    return CompanyDetails;
}());
exports.CompanyDetails = CompanyDetails;
//# sourceMappingURL=companydetails.js.map
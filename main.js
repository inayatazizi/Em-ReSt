"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var applicationuser_1 = require("./src/app/core/model/applicationuser");
var systemdetails_1 = require("./src/app/core/model/systemdetails");
var companydetails_1 = require("./src/app/core/model/companydetails");
var typeorm_1 = require("typeorm");
var upload_path = path.join(electron_1.app.getPath("appData"), './Em-ReSt/');
var win;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
var createWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dbPath, connection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dbPath = path.join(electron_1.app.getPath('appData'), './em-rest/db.sqlite');
                return [4 /*yield*/, typeorm_1.createConnection({
                        type: "sqlite",
                        synchronize: true,
                        logging: true,
                        database: dbPath,
                        entities: [applicationuser_1.ApplicationUser, systemdetails_1.SystemDetails, companydetails_1.CompanyDetails]
                    }).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
                        var _ApplicationUser, users, count, defaultUser, Exception_1, _ApplicationUserRepo, _SystemDetailsRepo, _CompanyDetailsRepo, electronScreen, size, appPath;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    _ApplicationUser = connection.getRepository(applicationuser_1.ApplicationUser);
                                    users = new applicationuser_1.ApplicationUser();
                                    return [4 /*yield*/, _ApplicationUser.find()];
                                case 1:
                                    count = _a.sent();
                                    return [4 /*yield*/, count];
                                case 2:
                                    if (!((_a.sent()).length == 0)) return [3 /*break*/, 5];
                                    users.UserRole = "admin";
                                    users.Password = "admin";
                                    users.ConfirmPassword = "admin";
                                    users.Email = "admin@gmail.com";
                                    users.FullName = "admin";
                                    return [4 /*yield*/, _ApplicationUser.create(users)];
                                case 3:
                                    defaultUser = _a.sent();
                                    return [4 /*yield*/, _ApplicationUser.save(defaultUser)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    Exception_1 = _a.sent();
                                    console.log("Exception", Exception_1.toString());
                                    return [3 /*break*/, 7];
                                case 7:
                                    _ApplicationUserRepo = connection.getRepository(applicationuser_1.ApplicationUser);
                                    _SystemDetailsRepo = connection.getRepository(systemdetails_1.SystemDetails);
                                    _CompanyDetailsRepo = connection.getRepository(companydetails_1.CompanyDetails);
                                    electronScreen = electron_1.screen;
                                    size = electronScreen.getPrimaryDisplay().workAreaSize;
                                    // Create the browser window.
                                    win = new electron_1.BrowserWindow({
                                        x: 0,
                                        y: 0,
                                        width: size.width,
                                        height: size.height,
                                        webPreferences: {
                                            nodeIntegration: true,
                                            webSecurity: false,
                                        },
                                        title: "EM-REST",
                                    });
                                    if (serve) {
                                        require('electron-reload')(__dirname, {
                                            electron: require(__dirname + "/node_modules/electron")
                                        });
                                        win.loadURL('http://localhost:4200');
                                    }
                                    else {
                                        win.loadURL(url.format({
                                            pathname: path.join(__dirname, 'dist/index.html'),
                                            protocol: 'file:',
                                            slashes: true
                                        }));
                                    }
                                    if (serve) {
                                        win.webContents.openDevTools();
                                    }
                                    // Emitted when the window is closed.
                                    win.on('closed', function () {
                                        // Dereference the window object, usually you would store window
                                        // in an array if your app supports multi windows, this is the time
                                        // when you should delete the corresponding element.
                                        win.destroy();
                                    });
                                    appPath = serve ? __dirname : process.resourcesPath.replace('resources', '');
                                    /////////Application User///////////
                                    electron_1.ipcMain.on('get-user-details', function (e, Id) { return __awaiter(void 0, void 0, void 0, function () {
                                        var singleApplicationUserDetail, _a, _b, ee_1, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 6, , 8]);
                                                    return [4 /*yield*/, _ApplicationUserRepo.findOne(Id)];
                                                case 1:
                                                    singleApplicationUserDetail = _d.sent();
                                                    if (!singleApplicationUserDetail) return [3 /*break*/, 3];
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ _UserDetails: singleApplicationUserDetail, Status: true, Message: 'Found' })];
                                                case 2:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 5];
                                                case 3:
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ _UserDetails: null, Status: false, Message: 'Not Found' })];
                                                case 4:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 5;
                                                case 5: return [3 /*break*/, 8];
                                                case 6:
                                                    ee_1 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ _UserDetails: null, Status: false, Message: ee_1.toString() })];
                                                case 7:
                                                    _c.returnValue = _d.sent();
                                                    return [3 /*break*/, 8];
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    electron_1.ipcMain.on('get-all-user-details', function (e) { return __awaiter(void 0, void 0, void 0, function () {
                                        var allUserDetails, _a, _b, ee_2, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 6, , 8]);
                                                    return [4 /*yield*/, _ApplicationUserRepo.find()];
                                                case 1:
                                                    allUserDetails = _d.sent();
                                                    if (!allUserDetails) return [3 /*break*/, 3];
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ _UserDetails: allUserDetails, Status: true, Message: 'Found' })];
                                                case 2:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 5];
                                                case 3:
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: 'Not Found' })];
                                                case 4:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 5;
                                                case 5: return [3 /*break*/, 8];
                                                case 6:
                                                    ee_2 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: ee_2.toString() })];
                                                case 7:
                                                    _c.returnValue = _d.sent();
                                                    return [3 /*break*/, 8];
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    electron_1.ipcMain.on('authorize-user', function (e, model) { return __awaiter(void 0, void 0, void 0, function () {
                                        var authStatus, authorize, _a, _b, ee_3, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    authStatus = false;
                                                    _d.label = 1;
                                                case 1:
                                                    _d.trys.push([1, 7, , 9]);
                                                    return [4 /*yield*/, _ApplicationUserRepo.query("select * from ApplicationUser where UserName='" + model.para1 + "' AND " + "Password='" + model.para2 + "'")];
                                                case 2:
                                                    authorize = _d.sent();
                                                    if (authorize.length > 0) {
                                                        authStatus = true;
                                                    }
                                                    if (!authStatus) return [3 /*break*/, 4];
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ _signInStatus: authStatus, Status: true, Message: 'Success' })];
                                                case 3:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 6];
                                                case 4:
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: authStatus, Message: 'Not Found' })];
                                                case 5:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 6;
                                                case 6: return [3 /*break*/, 9];
                                                case 7:
                                                    ee_3 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: authStatus, Message: ee_3.toString() })];
                                                case 8:
                                                    _c.returnValue = _d.sent();
                                                    console.log(ee_3.toString());
                                                    return [3 /*break*/, 9];
                                                case 9: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    electron_1.ipcMain.on('delete-user-details', function (e, Id) { return __awaiter(void 0, void 0, void 0, function () {
                                        var singleUserDetail, _a, _b, ee_4, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 7, , 9]);
                                                    return [4 /*yield*/, _ApplicationUserRepo.findOne(Id)];
                                                case 1:
                                                    singleUserDetail = _d.sent();
                                                    if (!!singleUserDetail) return [3 /*break*/, 3];
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: 'User Not Found' })];
                                                case 2:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 6];
                                                case 3: return [4 /*yield*/, _ApplicationUserRepo.query("delete from applicationuser where  id='" + Id + "'")];
                                                case 4:
                                                    _d.sent();
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: true, Message: 'Deleted successfully!!' })];
                                                case 5:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 6;
                                                case 6: return [3 /*break*/, 9];
                                                case 7:
                                                    ee_4 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: ee_4.toString() })];
                                                case 8:
                                                    _c.returnValue = _d.sent();
                                                    return [3 /*break*/, 9];
                                                case 9: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    electron_1.ipcMain.on('set-application-user-details', function (e, model) { return __awaiter(void 0, void 0, void 0, function () {
                                        var _a, newApplicationUserEntity, _b, ee_5, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 8, , 10]);
                                                    if (!(model.UserId > 0)) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, _ApplicationUserRepo.save(model)];
                                                case 1:
                                                    _d.sent();
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: true, Message: 'Updated' })];
                                                case 2:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 7];
                                                case 3: return [4 /*yield*/, _ApplicationUserRepo.create(model)];
                                                case 4:
                                                    newApplicationUserEntity = _d.sent();
                                                    return [4 /*yield*/, _ApplicationUserRepo.save(newApplicationUserEntity)];
                                                case 5:
                                                    _d.sent();
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: true, Message: 'User Added' })];
                                                case 6:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 7;
                                                case 7: return [3 /*break*/, 10];
                                                case 8:
                                                    ee_5 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: ee_5.toString() })];
                                                case 9:
                                                    _c.returnValue = _d.sent();
                                                    return [3 /*break*/, 10];
                                                case 10: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    /////////////Application User///////////////////
                                    ////Company And System Details/////
                                    electron_1.ipcMain.on('set-user-information', function (e, model) { return __awaiter(void 0, void 0, void 0, function () {
                                        var existingCompany, _a, newCompanyEntity, newSystem, _b, ee_6, _c;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 13, , 15]);
                                                    return [4 /*yield*/, _CompanyDetailsRepo.query("select * from user where ='application_user" + model.para1 + "'")];
                                                case 1:
                                                    existingCompany = _d.sent();
                                                    if (!(existingCompany.length == 0)) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, _CompanyDetailsRepo.save(model.para2)];
                                                case 2:
                                                    _d.sent();
                                                    return [4 /*yield*/, _SystemDetailsRepo.save(model.para3)];
                                                case 3:
                                                    _d.sent();
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: true, Message: 'Updated' })];
                                                case 4:
                                                    _a.returnValue = _d.sent();
                                                    return [3 /*break*/, 12];
                                                case 5: return [4 /*yield*/, _CompanyDetailsRepo.create(model.para2)];
                                                case 6:
                                                    newCompanyEntity = _d.sent();
                                                    return [4 /*yield*/, _CompanyDetailsRepo.save(newCompanyEntity)];
                                                case 7:
                                                    _d.sent();
                                                    return [4 /*yield*/, _SystemDetailsRepo.create(model.para3)];
                                                case 8:
                                                    newSystem = _d.sent();
                                                    return [4 /*yield*/, _SystemDetailsRepo.save(newSystem)];
                                                case 9:
                                                    _d.sent();
                                                    return [4 /*yield*/, _ApplicationUserRepo.save(model.para1)];
                                                case 10:
                                                    _d.sent();
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: true, Message: 'Success' })];
                                                case 11:
                                                    _b.returnValue = _d.sent();
                                                    _d.label = 12;
                                                case 12: return [3 /*break*/, 15];
                                                case 13:
                                                    ee_6 = _d.sent();
                                                    _c = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: ee_6.toString() })];
                                                case 14:
                                                    _c.returnValue = _d.sent();
                                                    return [3 /*break*/, 15];
                                                case 15: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    electron_1.ipcMain.on('get-complete-information', function (e, model) { return __awaiter(void 0, void 0, void 0, function () {
                                        var userdet, _a, ee_7, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    _c.trys.push([0, 2, , 4]);
                                                    userdet = _ApplicationUserRepo.find(model.para1);
                                                    _a = e;
                                                    return [4 /*yield*/, JSON.stringify({ _UserDetails: userdet, Message: 'Success' })];
                                                case 1:
                                                    _a.returnValue = _c.sent();
                                                    return [3 /*break*/, 4];
                                                case 2:
                                                    ee_7 = _c.sent();
                                                    _b = e;
                                                    return [4 /*yield*/, JSON.stringify({ Status: false, Message: ee_7.toString() })];
                                                case 3:
                                                    _b.returnValue = _c.sent();
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    ////Company And System Details////
                                    return [2 /*return*/, win];
                            }
                        });
                    }); })];
            case 1:
                connection = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map
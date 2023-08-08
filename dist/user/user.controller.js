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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const passport_1 = require("@nestjs/passport");
let UserController = exports.UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    getImage() {
        return this.userService.getImage();
    }
    findImage(name) {
        return this.userService.findImage(name);
    }
    getInforImageUser(id) {
        return this.userService.getInforImageUser(+id);
    }
    getComnent(id) {
        return this.userService.getComnent(+id);
    }
    getSaveImage(id) {
        return this.userService.getSaveImage(+id);
    }
    cmtImage(user_id, payload) {
        return this.userService.cmtImage(+user_id, payload);
    }
    getUser(userId) {
        return this.userService.getUser(+userId);
    }
    getImageList(userId) {
        return this.userService.getImageList(+userId);
    }
    getImageCreate(userId) {
        return this.userService.getImageCreate(+userId);
    }
    removeImage(imgId) {
        return this.userService.removeImage(+imgId);
    }
    upLoadImage(file, userId) {
        return this.userService.upLoadImage(file, Number(userId));
    }
    updateUser(userId, values) {
        return this.userService.updateUser(+userId, values);
    }
};
__decorate([
    (0, common_1.Get)("/get-image"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getImage", null);
__decorate([
    (0, common_1.Get)('/get-image/image/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findImage", null);
__decorate([
    (0, common_1.Get)('/get-image/detail/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getInforImageUser", null);
__decorate([
    (0, common_1.Get)("/get-image/cmt/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getComnent", null);
__decorate([
    (0, common_1.Get)("/get-image/saved/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSaveImage", null);
__decorate([
    (0, common_1.Post)("/get-image/give-cmt/:user_id"),
    __param(0, (0, common_1.Param)("user_id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "cmtImage", null);
__decorate([
    (0, common_1.Get)("/get-user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("/get-user/saved/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getImageList", null);
__decorate([
    (0, common_1.Get)("/get-user/created/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getImageCreate", null);
__decorate([
    (0, common_1.Delete)('remove-image/:imgId'),
    __param(0, (0, common_1.Param)('imgId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeImage", null);
__decorate([
    (0, common_1.Post)("/upload-image/:userId"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "upLoadImage", null);
__decorate([
    (0, common_1.Patch)("/update-user/:user_id"),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], UserController);
//# sourceMappingURL=user.controller.js.map
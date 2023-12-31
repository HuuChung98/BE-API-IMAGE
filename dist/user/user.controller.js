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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
class Comment {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "cmt", type: String }),
    __metadata("design:type", String)
], Comment.prototype, "cmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "image_id", type: Number }),
    __metadata("design:type", Number)
], Comment.prototype, "image_id", void 0);
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class UpdateUser {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "fullName", type: String }),
    __metadata("design:type", String)
], UpdateUser.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "email", type: String }),
    __metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "password", type: String }),
    __metadata("design:type", String)
], UpdateUser.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "age", type: String }),
    __metadata("design:type", String)
], UpdateUser.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "avatar", type: String }),
    __metadata("design:type", String)
], UpdateUser.prototype, "avatar", void 0);
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
    __metadata("design:paramtypes", [String, Comment]),
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
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'file',
        type: FileUploadDto
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + "/public/img",
            filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname)
        })
    })),
    (0, common_1.Post)("/upload-image/:userId"),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "upLoadImage", null);
__decorate([
    (0, common_1.Patch)("/update-user/:user_id"),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUser]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map
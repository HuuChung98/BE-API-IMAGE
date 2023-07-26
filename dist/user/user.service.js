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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const update_user_dto_1 = require("./dto/update-user.dto");
const client_1 = require("@prisma/client");
let UserService = exports.UserService = class UserService {
    constructor(updateUserDto) {
        this.updateUserDto = updateUserDto;
        this.prisma = new client_1.PrismaClient();
    }
    ;
    async getImage() {
        let data = await this.prisma.image.findMany();
        return data;
    }
    async findImage(name) {
        let data = await this.prisma.image.findMany({ where: { image_name: name } });
        return data;
    }
    async getInforImageUser(imageId) {
        let getInforImage = await this.prisma.image.findFirst({
            include: {
                user: true,
                comment: { include: {
                        user: true
                    } }
            },
            where: {
                image_id: imageId
            }
        });
        return getInforImage;
    }
    async getComnent(imageId) {
        let cmt = await this.prisma.comment.findFirst({ where: { image_id: imageId } });
        return cmt;
    }
    async getSaveImage(imageId) {
        let checkSaved = await this.prisma.saved.findFirst({ where: { image_id: imageId } });
        if (!checkSaved) {
            return " Hình chưa được lưu trong thư mục của bạn";
        }
        else {
            return checkSaved;
        }
    }
    async cmtImage(user_id, payload) {
        try {
            console.log("Line 63", payload);
            const { cmt, image_id } = payload;
            const newCmt = {
                cmt: cmt,
                image_id: Number(image_id),
                user_id
            };
            await this.prisma.comment.create({ data: newCmt });
            console.log("Line 72", newCmt);
            return newCmt;
        }
        catch (error) {
            return "Lỗi Be";
        }
    }
    async getUser(userId) {
        let data = await this.prisma.user.findFirst({ where: { user_id: userId } });
        return data;
    }
    async getImageList(userId) {
        let imageList = await this.prisma.saved.findMany({
            include: {
                image: true
            },
            where: {
                user_id: userId
            }
        });
        return imageList;
    }
    async getImageCreate(userId) {
        try {
            let imageCreateByUser = await this.prisma.image.findMany({
                include: {
                    user: true
                },
                where: {
                    user_id: userId
                }
            });
            return imageCreateByUser;
        }
        catch (error) {
        }
    }
    async removeImage(imgId) {
        try {
            let img = await this.prisma.image.delete({ where: { image_id: imgId } });
            return "Ảnh đã xóa thành công";
        }
        catch (error) {
            return "Lỗi BE";
        }
    }
    async upLoadImage(file, userId) {
        try {
            let { destination, filename } = file;
            let uploadImage = {
                image_name: filename,
                link: destination + filename,
                user_id: userId
            };
            await this.prisma.image.create({ data: uploadImage });
            return "Upload ảnh thành công";
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async updateUser(userId, values) {
        try {
            let { full_name, email, password, age, avatar } = values;
            console.log(values);
            let updateUser = {
                full_name,
                email,
                password,
                age: Number(age),
                avatar
            };
            let update = await this.prisma.user.update({ data: updateUser, where: { user_id: userId } });
            console.log(update);
            return "Cập nhật thành công";
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto])
], UserService);
//# sourceMappingURL=user.service.js.map
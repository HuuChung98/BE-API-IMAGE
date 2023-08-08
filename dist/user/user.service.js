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
const bcrypt = require("bcrypt");
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
                comment: {
                    include: {
                        user: true
                    }
                }
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
            const { cmt, image_id } = payload;
            const newCmt = {
                cmt: cmt,
                image_id: Number(image_id),
                user_id
            };
            await this.prisma.comment.create({ data: newCmt });
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
            return error;
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
                link: `http://image.memorytera.com/public/img/${filename}`,
                user_id: userId
            };
            await this.prisma.image.create({ data: uploadImage });
            return "Upload ảnh thành công";
        }
        catch (error) {
            return "Upload ảnh không thành công";
        }
    }
    async updateUser(userId, values) {
        try {
            let { full_name, email, password, age, avatar } = values;
            console.log(values);
            let checkUser = await this.prisma.user.findFirst({ where: { email: email } });
            if (!checkUser) {
                let updateUser = {
                    full_name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    age: Number(age),
                    avatar
                };
                await this.prisma.user.update({ data: updateUser, where: { user_id: userId } });
                return updateUser;
            }
            else {
                throw new common_1.HttpException({ content: "Email đã tồn tại", code: 404 }, 404);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto])
], UserService);
//# sourceMappingURL=user.service.js.map
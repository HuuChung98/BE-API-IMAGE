/// <reference types="multer" />
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getImage(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {})[]>;
    findImage(name: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {})[]>;
    getInforImageUser(id: string): Promise<{
        user: import("@prisma/client/runtime/library").GetResult<{
            user_id: number;
            full_name: string;
            email: string;
            password: string;
            age: number;
            avatar: string;
        }, unknown> & {};
        comment: ({
            user: import("@prisma/client/runtime/library").GetResult<{
                user_id: number;
                full_name: string;
                email: string;
                password: string;
                age: number;
                avatar: string;
            }, unknown> & {};
        } & import("@prisma/client/runtime/library").GetResult<{
            cmt_id: number;
            cmt: string;
            date_like: Date;
            user_id: number;
            image_id: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime/library").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {}>;
    getComnent(id: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        cmt_id: number;
        cmt: string;
        date_like: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}>;
    getSaveImage(id: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        date_saved: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}) | " Hình chưa được lưu trong thư mục của bạn">;
    cmtImage(user_id: any, payload: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        cmt_id: number;
        cmt: string;
        date_like: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}) | "Lỗi BE">;
    getUser(userId: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        full_name: string;
        email: string;
        password: string;
        age: number;
        avatar: string;
    }, unknown> & {}>;
    getImageList(userId: string): Promise<({
        image: import("@prisma/client/runtime/library").GetResult<{
            image_id: number;
            image_name: string;
            link: string;
            description: string;
            user_id: number;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        date_saved: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {})[]>;
    getImageCreate(userId: string): Promise<any>;
    removeImage(imgId: string): Promise<"Lỗi BE" | "Ảnh đã xóa thành công">;
    upLoadImage(file: Express.Multer.File, userId: string): Promise<"Upload ảnh thành công" | "Upload ảnh không thành công">;
    updateUser(userId: string, values: any): Promise<{
        full_name: any;
        email: any;
        password: string;
        age: number;
        avatar: any;
    }>;
}

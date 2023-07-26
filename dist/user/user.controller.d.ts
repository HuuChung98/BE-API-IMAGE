/// <reference types="multer" />
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getImage(): Promise<(import("@prisma/client/runtime").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {})[]>;
    findImage(name: string): Promise<(import("@prisma/client/runtime").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {})[]>;
    getInforImageUser(id: string): Promise<{
        user: import("@prisma/client/runtime").GetResult<{
            user_id: number;
            full_name: string;
            email: string;
            password: string;
            age: number;
            avatar: string;
        }, unknown> & {};
        comment: ({
            user: import("@prisma/client/runtime").GetResult<{
                user_id: number;
                full_name: string;
                email: string;
                password: string;
                age: number;
                avatar: string;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            cmt_id: number;
            cmt: string;
            date_like: Date;
            user_id: number;
            image_id: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {}>;
    getComnent(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        cmt_id: number;
        cmt: string;
        date_like: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}>;
    getSaveImage(id: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        date_saved: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}) | " Hình chưa được lưu trong thư mục của bạn">;
    cmtImage(user_id: any, payload: any): Promise<"Lỗi Be" | {
        cmt: any;
        image_id: number;
        user_id: number;
    }>;
    getUser(userId: string): Promise<import("@prisma/client/runtime").GetResult<{
        user_id: number;
        full_name: string;
        email: string;
        password: string;
        age: number;
        avatar: string;
    }, unknown> & {}>;
    getImageList(userId: string): Promise<({
        image: import("@prisma/client/runtime").GetResult<{
            image_id: number;
            image_name: string;
            link: string;
            description: string;
            user_id: number;
        }, unknown> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        date_saved: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {})[]>;
    getImageCreate(userId: string): Promise<({
        user: import("@prisma/client/runtime").GetResult<{
            user_id: number;
            full_name: string;
            email: string;
            password: string;
            age: number;
            avatar: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime").GetResult<{
        image_id: number;
        image_name: string;
        link: string;
        description: string;
        user_id: number;
    }, unknown> & {})[]>;
    removeImage(imgId: string): Promise<"Lỗi BE" | "Ảnh đã xóa thành công">;
    upLoadImage(file: Express.Multer.File, userId: string): Promise<string>;
    updateUser(userId: string, values: any): Promise<string>;
}

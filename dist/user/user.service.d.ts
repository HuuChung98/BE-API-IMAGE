/// <reference types="multer" />
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
export declare class UserService {
    private updateUserDto;
    constructor(updateUserDto: UpdateUserDto);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    getInforImageUser(imageId: number): Promise<{
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
    getComnent(imageId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        cmt_id: number;
        cmt: string;
        date_like: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}>;
    getSaveImage(imageId: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        date_saved: Date;
        user_id: number;
        image_id: number;
    }, unknown> & {}) | " Hình chưa được lưu trong thư mục của bạn">;
    cmtImage(user_id: number, payload: any): Promise<{
        cmt: any;
        image_id: number;
        user_id: number;
    } | "Lỗi BE">;
    getUser(userId: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        full_name: string;
        email: string;
        password: string;
        age: number;
        avatar: string;
    }, unknown> & {}>;
    getImageList(userId: number): Promise<({
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
    getImageCreate(userId: number): Promise<any>;
    removeImage(imgId: number): Promise<"Lỗi BE" | "Ảnh đã xóa thành công">;
    upLoadImage(file: Express.Multer.File, userId: number): Promise<"Upload ảnh thành công" | "Upload ảnh không thành công">;
    updateUser(userId: number, values: any): Promise<{
        full_name: any;
        email: any;
        password: string;
        age: number;
        avatar: any;
    }>;
}

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation, import("@prisma/client/runtime").DefaultArgs>;
    login(userLogIn: any): Promise<import("@prisma/client/runtime").GetResult<{
        user_id: number;
        full_name: string;
        email: string;
        password: string;
        age: number;
        avatar: string;
    }, unknown> & {}>;
    signUp(userSignUp: any): Promise<"Email đã tồn tại" | "Đăng kí thành công">;
}

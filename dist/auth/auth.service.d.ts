import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    login(userLogIn: any): Promise<{
        token: string;
        email: string;
        password: string;
        user_id: number;
        full_name: string;
        age: number;
        avatar: string;
    }>;
    signUp(userSignUp: any): Promise<string>;
}

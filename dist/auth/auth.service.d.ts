import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    login(createAuthDto: any): Promise<{
        token: string;
        full_name: string;
        email: string;
        password: string;
        user_id: number;
        age: number;
        avatar: string;
    }>;
    signUp(userSignUp: any): Promise<string>;
}

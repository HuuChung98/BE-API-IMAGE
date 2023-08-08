import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    prisma: any;
    login(userLogIn: any): unknown;
    signUp(userSignUp: any): unknown;
}

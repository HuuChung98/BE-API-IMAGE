import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
declare class CreateUser {
    full_name: string;
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(createAuthDto: CreateAuthDto): Promise<{
        token: string;
        email: string;
        password: string;
        user_id: number;
        full_name: string;
        age: number;
        avatar: string;
    }>;
    signUp(body: CreateUser): Promise<string>;
}
export {};

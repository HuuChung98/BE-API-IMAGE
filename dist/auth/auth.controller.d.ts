import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        token: string;
        email: string;
        password: string;
        user_id: number;
        full_name: string;
        age: number;
        avatar: string;
    }>;
    signUp(body: any): Promise<string>;
}

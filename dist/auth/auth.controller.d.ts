import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<import("@prisma/client/runtime").GetResult<{
        user_id: number;
        full_name: string;
        email: string;
        password: string;
        age: number;
        avatar: string;
    }, unknown> & {}>;
    signUp(body: any): Promise<"Email đã tồn tại" | "Đăng kí thành công">;
}

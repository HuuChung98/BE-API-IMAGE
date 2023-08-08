"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = new client_1.PrismaClient();
    }
    ;
    async login(userLogIn) {
        try {
            let { email, password } = userLogIn;
            let checkUser = await this.prisma.user.findFirst({ where: { email } });
            if (checkUser) {
                if (bcrypt.compareSync(password, checkUser.password)) {
                    let accessToken = await this.jwtService.signAsync({ data: "data" }, { secret: "CHUNG", expiresIn: "5h" });
                    return { ...checkUser, token: accessToken };
                }
                else {
                    throw new common_1.HttpException({ content: "tài khoản hoặc mật khẩu không đúng" }, 404);
                }
            }
            else {
                throw new common_1.HttpException({ content: "email chưa được đăng kí hoặc không đúng định dạng ", code: 404 }, 404);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async signUp(userSignUp) {
        try {
            let { full_name, email, password } = userSignUp;
            let checkUser = await this.prisma.user.findFirst({ where: { email: email } });
            if (!checkUser) {
                let newUser = {
                    full_name,
                    email,
                    password: await bcrypt.hash(password, 10)
                };
                await this.prisma.user.create({ data: newUser });
                return "Đăng kí thành công";
            }
            else {
                throw new common_1.HttpException({ content: "Email đã tồn tại", code: 404 }, 404);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
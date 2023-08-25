import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { };


  prisma = new PrismaClient();

  async login(createAuthDto) {
    try {
      let { email, password } = createAuthDto;
      let checkUser = await this.prisma.user.findFirst({ where: { email } });

      if (checkUser) {

        // Kiểm tra mật khẩu có đúng hay không. Đúng => login thành công
        if (bcrypt.compareSync(password, checkUser.password)) {

          // let accessToken = this.jwtService.signAsync({ data: "data" }, { secret: this.configService.get("KEY"), expiresIn: "4d" });
          let accessToken = await this.jwtService.signAsync({ data: "data" }, { secret: "CHUNG", expiresIn: "5h" });

          return { ...checkUser, token: accessToken };

        }

        else {
          // return "Mật khẩu không đúng";  // sai
          throw new HttpException({ content: "tài khoản hoặc mật khẩu không đúng" }, 404);
          // throw new HttpException("mật khẩu không đúng", 400); 

        }
      }
      else {
        throw new HttpException({ content: "email chưa được đăng kí hoặc không đúng định dạng ", code: 404 }, 404);
      }
    } catch (error) {
      // throw new HttpException( error.response.mess, error.status != 500 ? error.response.code : 500 ); 
      console.log(error);
      throw new HttpException(error.response.content, error.status);

    }
  }

  async signUp(userSignUp) {

    try {
      let { full_name, email, password } = userSignUp;
      let checkUser = await this.prisma.user.findFirst({ where: { email: email } });
      if (!checkUser) {
        // return "Email đã tồn tại";
        let newUser = {
          full_name,
          email,
          password: await bcrypt.hash(password, 10)
        };
        // await this.prisma.nguoi_dung.create( { data: newUser } );  
        await this.prisma.user.create({ data: newUser });

        return "Đăng kí thành công";

      } else {
        throw new HttpException({ content: "Email đã tồn tại", code: 404 }, 404)
        // return "Email đã đăng kí bởi tài khoản khác"
      }

    } catch (error) {
      // throw new HttpException("Lỗi BE", 500);
      throw new HttpException(error.response.content, error.status);
    }

  }

}

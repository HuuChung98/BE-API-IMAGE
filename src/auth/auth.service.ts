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
    private configService: ConfigService // khai báo dẫn đến KEY được định nghĩa trong .evn file
  ) { };


  prisma = new PrismaClient();

  async login(userLogIn) {
    try {
      let { email, password } = userLogIn;
      let checkUser = await this.prisma.user.findFirst({ where: { email } });

      if (checkUser) {

        // Kiểm tra mật khẩu có đúng hay không. Đúng => login thành công
        if (bcrypt.compareSync(password, checkUser.password)) {

          // let accessToken = this.jwtService.signAsync({ data: "data" }, { secret: this.configService.get("KEY"), expiresIn: "4d" });
          let accessToken = this.jwtService.signAsync({ data: "data" }, { secret: "CHUNG", expiresIn: "4d" });


          return checkUser;
          // console.log(accessToken);

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
      if (checkUser) {
        return "Email đã tồn tại";

      } else {
        let newUser = {
          full_name,
          email,
          password: await bcrypt.hash(password, 10)
        };
        // await this.prisma.nguoi_dung.create( { data: newUser } );  
        await this.prisma.user.create({ data: newUser });

        return "Đăng kí thành công";
      }
      // return "Đăng kí không thành công";
    } catch {
      throw new HttpException("Lỗi BE", 500);
    }

  }

}

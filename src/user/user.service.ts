import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(private updateUserDto: UpdateUserDto) { };

  prisma = new PrismaClient();

  // Xử lý lấy hình ảnh về
  async getImage() {
    let data = await this.prisma.image.findMany();
    return data;
  }

  // xử lý tìm kiếm danh sách ảnh theo tên
  async findImage(name: string) {
    let data = await this.prisma.image.findMany({ where: { image_name: name } })
    return data;
  }

  // xử lý lấy thông tin ảnh và người tạo ảnh bằng id ảnh
  async getInforImageUser(imageId: number) {

    let getInforImage = await this.prisma.image.findFirst(
      {
        include: {
          user: true,
          // comment: true  // lấy cmt của user nếu có
          comment: {
            include: {
              user: true
            }
          }  // lấy cmt của user nếu có

        },
        where: {
          image_id: imageId
        }
      });
    return getInforImage;

  }

  // xử lý lấy thông tin cmt của user 
  async getComnent(imageId: number) {
    let cmt = await this.prisma.comment.findFirst({ where: { image_id: imageId } })
    return cmt;
  }

  async getSaveImage(imageId: number) {
    let checkSaved = await this.prisma.saved.findFirst({ where: { image_id: imageId } })

    if (!checkSaved) {
      return " Hình chưa được lưu trong thư mục của bạn";
    } else {
      // return "Hình đã lưu";
      return checkSaved;
    }
  }

  async cmtImage(user_id: number, payload) {
    try {
      const { cmt, image_id } = payload;
      const newCmt = {
        cmt: cmt,
        image_id: Number(image_id),
        user_id
      }
      await this.prisma.comment.create({ data: newCmt });
      return newCmt;
    } catch (error) {
      return "Lỗi BE";
    }
  }

  async getUser(userId: number) {
    let data = await this.prisma.user.findFirst({ where: { user_id: userId } });
    return data;
  }

  // xử lý lấy danh sách ảnh đã lưu theo userId
  async getImageList(userId: number) {
    let imageList = await this.prisma.saved.findMany({
      include: {
        image: true
      },
      where: {
        user_id: userId
      }
    });
    return imageList;

  }

  // xử lý lấy danh sách ảnh đã tạo theo userId
  async getImageCreate(userId: number) {
    try {
      let imageCreateByUser = await this.prisma.image.findMany({
        include: {
          user: true
        },
        where: {
          user_id: userId
        }
      });
      return imageCreateByUser;

    } catch (error) {
      return error;
    }
  }

  async removeImage(imgId: number) {
    try {
      let img = await this.prisma.image.delete({ where: { image_id: imgId } });
      return "Ảnh đã xóa thành công";
    } catch (error) {
      return "Lỗi BE"
    }

  }

  async upLoadImage(file: Express.Multer.File, userId: number) {
    try {
      let { destination, filename } = file;
      let uploadImage = {
        image_name: filename,
        link: `http://localhost:8080/public/img/${filename}`,
        user_id: userId
      }
      await this.prisma.image.create({ data: uploadImage });
      // throw new HttpException({ content: "đã đăng hình thành công" })
      return "Upload ảnh thành công";
    } catch (error) {
      return "Upload ảnh không thành công";
    }
  }

  async updateUser(userId: number, values) {
    try {
      let { full_name, email, password, age, avatar } = values;
      console.log(values);

      let checkUser = await this.prisma.user.findFirst({ where: { email: email } });

      if (!checkUser) {
        let updateUser = {
          full_name,
          email,
          password: await bcrypt.hash(password, 10),
          age: Number(age),
          avatar
        }

        await this.prisma.user.update({ data: updateUser, where: { user_id: userId } });

        // return "Cập nhật thành công";
        return updateUser;
      } else {
        throw new HttpException({ content: "Email đã tồn tại", code: 404 }, 404);
      }

    } catch (error) {
      // throw new HttpException("Lỗi BE", 500);
      throw new HttpException(error.response.content, error.status);
    }

  }

}
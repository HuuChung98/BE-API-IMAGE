import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, Query, UseGuards, Headers, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

// Thêm JWT để khóa hết các API của controller
// @UseGuards(AuthGuard("jwt")) // jwt là key mặc định
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  // api lấy lấy tất cả hình ảnh
  @Get("/get-image")
  getImage() {
    return this.userService.getImage();
  }

  // API tìm kiếm ảnh theo tên ảnh
  @Get('/get-image/image/:name')
  findImage(@Param('name') name: string) {
    return this.userService.findImage(name);
  }

  // API thông tin ảnh và người tạo ảnh theo id ảnh ()
  @Get('/get-image/detail/:id')
  getInforImageUser(@Param("id") id: string) {
    return this.userService.getInforImageUser(+id);
  }

  // API thông tin bình luận theo ảnh
  @Get("/get-image/cmt/:id")
  getComnent(@Param("id") id: string) {
    return this.userService.getComnent(+id)
  }

  // API thông tin đã lưu hình này chưa theo id ảnh(dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
  @Get("/get-image/saved/:id")
  getSaveImage(@Param("id") id: string) {
    return this.userService.getSaveImage(+id)
  }

  // API post thông tin bình luận ảnh 
  @Post("/get-image/give-cmt/:user_id")
  cmtImage(@Param("user_id") user_id, @Body() payload) {
    return this.userService.cmtImage(+user_id, payload)
  }

  // API lấy thông tin người dùng theo userId
  @Get("/get-user/:userId")
  getUser(@Param("userId") userId: string) {
    return this.userService.getUser(+userId);
  }

  // API danh sách ảnh đã lưu theo UserId (sử dụng table saved)
  @Get("/get-user/saved/:userId")
  getImageList(@Param("userId") userId: string) {
    return this.userService.getImageList(+userId);
  }

  // API lấy danh sách ảnh đã tạo theo user id  (sử dụng table image)
  @Get("/get-user/created/:userId")
  getImageCreate(@Param("userId") userId: string) {
    return this.userService.getImageCreate(+userId)
  }

  // API xóa ảnh đã tạo theo user id 
  @Delete('remove-image/:imgId')
  removeImage(@Param('imgId') imgId: string) {
    return this.userService.removeImage(+imgId);
  }

  // API post thêm ảnh của một user
  @Post("/upload-image/:userId")
  // Tạo một middle ở giữa để xử lý ảnh
  @UseInterceptors(FileInterceptor("file",
    {
      storage: diskStorage({
        // destination: process.cwd() + "http://128.199.223.79:8080/public/img",
        destination: "http://128.199.223.79:8080/public/img",

        filename: (req, file, callback) => callback(null, new Date().getTime() + file.originalname) // đổi tên hình 
      })
    }
  ))
  upLoadImage(@UploadedFile() file: Express.Multer.File, @Param("userId") userId: string) {
    return this.userService.upLoadImage(file, Number(userId));
  }

  // API PUT thông tin cá nhân của user
  @Patch("/update-user/:user_id")
  updateUser(@Param('user_id') userId: string, @Body() values) {
    return this.userService.updateUser(+userId, values);
  }
}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, UpdateUserDto]
})
export class UserModule {}

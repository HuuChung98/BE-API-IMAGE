import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class CreateUser {
  @ApiProperty({description: "fullName", type: String})
  full_name: string

  @ApiProperty({description: "email", type: String})
  email: string

  @ApiProperty({description: "password", type: String})
  password: string
}

@ApiBearerAuth()
@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // API login user
  @Post("/login")
  login(@Body() createAuthDto: CreateAuthDto){
    return this.authService.login(createAuthDto);
  }

  //API sign-up user
  @Post("/sign-up")
  signUp(@Body() body: CreateUser) {
    return this.authService.signUp(body);
  }

}

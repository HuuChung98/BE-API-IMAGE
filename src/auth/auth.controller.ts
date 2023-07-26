import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // API login user
  @Post("/login")
  login(@Body() body){
    return this.authService.login(body);
  }

  //API sign-up user
  @Post("/sign-up")
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

}

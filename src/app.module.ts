import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [AuthModule, 
            UserModule,
            ConfigModule.forRoot(
              {
                isGlobal: true
              }), AuthModule
          ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

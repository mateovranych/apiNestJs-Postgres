import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
        global: true,
        
      }),
      inject: [ConfigService],
    }),
    // JwtModule.register({   //Importo el módulo de Jwt para hacer el token.
    //   global: true,
    //   secret: jwtConstants.secret,   //Sirve para configurar la clave secrea
    //   signOptions: { expiresIn: '1d' }  //Esto es lo que va a expirar el jwt
    // }), 
  ], //Importo el usersModules
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}

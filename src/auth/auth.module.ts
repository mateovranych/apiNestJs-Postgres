import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports:[UsersModule,
    JwtModule.register({   //Importo el módulo de Jwt para hacer el token.
      global: true,
      secret: jwtConstants.secret,   //Sirve para configurar la clave secrea
      signOptions: { expiresIn: '1d' }  //Esto es lo que va a expirar el jwt
    }), 
  ], //Importo el usersModules
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

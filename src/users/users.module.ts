import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule )], //Tengo que poner el TypeOrmModule para poder inyectarlo en la base de datos TypeOrmModule.forFeature([User])
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],//Exporto para authService
})
export class UsersModule {}

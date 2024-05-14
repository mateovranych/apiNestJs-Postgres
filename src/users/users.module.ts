import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])], //Tengo que poner el TypeOrmModule para poder inyectarlo en la base de datos TypeOrmModule.forFeature([User])
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],//Exporto para authService
})
export class UsersModule {}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

constructor( 
    private readonly usersService: UsersService,
    private readonly jwtService:JwtService
){

}

async register({username, email, password}:RegisterDto){
    const user = await this.usersService.findOneByEmail(email);
    if(user){
        throw new BadRequestException('Ya existe un usuario registrado con ese email.')
    }
    await this.usersService.create({
        username, 
        email, 
        password: await bcryptjs.hash(password, 15) //Hasheo la contraseña con el bycryptjs.hash y después le paso el número de saltos (password, 15)
    });    
}

async login({email, password}:loginDto){

    //Hago una constante user, que espere la llamada del servicio usuario que busque el email

    const user = await this.usersService.findByEmailWithPassword(email)
    if(!user){
        throw new UnauthorizedException('El email no es correcto')
    }

    //Hago una constante isPasswordValid, que va a utilizar la biblioteca bycryptjs 
    //para comparar la contraseña con la hasheada para entrar- Por eso el compare(password, user.password)

    const isPasswordValid = await bcryptjs.compare(password,user.password);
    if(!isPasswordValid){
        throw new UnauthorizedException('Contraseña incorrecta')
    }
    const payload = {email: user.email, role: user.role};
    const token = await this.jwtService.signAsync(payload)

    return {
        token,
        email,
    }
 
 }

 
}

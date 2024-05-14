import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Role } from '../common/enum/rol.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/enum/decorators.active.user/active-user.decoratorts';
import { User } from 'src/users/entities/user.entity';
import { userActiveInterface } from 'src/common/enum/interfaces/user-interface.active';

interface RequestWithUser extends Request{

    user:{
        email:string,
        role:string,        
    }
}
@Controller('auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
    ){}

    //Tengo que definir el método con Post, para probarlo en el postman.
    @Post('login')
    login(@Body()loginDto:loginDto){
        
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body()registerDto: RegisterDto)
    {        
        return this.authService.register(registerDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(@ActiveUser() user: userActiveInterface){
        
        console.log(user)

        return user;

    }

}


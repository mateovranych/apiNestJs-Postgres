import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterDto{


    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(1)
    username:string;

  

    @IsEmail()
    email:string;

    @Transform(({value})=> value.trim()) //No deja poner espacios en blanco, el trim lo hace fallar
    @IsString()
    @MinLength(6)
    password:string;


}
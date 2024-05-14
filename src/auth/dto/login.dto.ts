import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginDto{
    @IsEmail()
    email: string;
    @Transform(({value})=> value.trim()) //No deja poner espacios en blanco, el trim lo hace fallar
    @IsString()
    @MinLength(6)
    password: string;

}
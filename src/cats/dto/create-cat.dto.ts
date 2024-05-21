import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {


    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    age: number;

    @IsString()
    @IsOptional()
    breed?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    readonly imagePath?: string;



}

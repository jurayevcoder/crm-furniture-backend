import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInStaffDto {
    @ApiProperty({ example: "john", description: "User Name" })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ example: "qwerty", description: "Password" })
    @IsString()
    @IsNotEmpty()
    password: string;
}
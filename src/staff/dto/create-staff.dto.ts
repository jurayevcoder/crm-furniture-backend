import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStaffDto {
    @ApiProperty({example: "John Doe", description: "Full Name"})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "+998901234567", description: "Phone Number"})
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({example: "8600 8963 2569 7123", description: "Card Number"})
    @IsString()
    @IsNotEmpty()
    card: string;

    @ApiProperty({example: "john", description: "User Name"})
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({example: "qwerty", description: "Password"})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: "SUPER-ADMIN | ADMIN | DELIVERY | OPERATOR", description: "Role"})
    @IsString()
    @IsNotEmpty()
    role: string;
}

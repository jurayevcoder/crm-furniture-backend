import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty({example: "+998901234567", description: "Phone number"})
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({example: "1", description: "Staff id"})
    @IsNumber()
    @IsNotEmpty()
    staff_id: number;

    @ApiProperty({example: "true or false", description: "Status phone number"})
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}

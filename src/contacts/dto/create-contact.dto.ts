import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty({example: "+998901234567", description: "Phone number"})
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({example: "1", description: "Staff id"})
    @IsNumber()
    @IsNotEmpty()
    staff_id: number;

    @ApiProperty({example: "busy | non exist | cancel", description: "Status phone number"})
    @IsString()
    @IsNotEmpty()
    status: string;
}

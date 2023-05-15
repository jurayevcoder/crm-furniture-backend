import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ActivateStaffDto {
    @ApiProperty({example: "1", description: "Staff Id"})
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({example: "true or false", description: "Activate staff"})
    @IsBoolean()
    @IsNotEmpty()
    value: boolean;
}

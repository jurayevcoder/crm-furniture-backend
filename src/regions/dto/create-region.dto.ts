import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({example: "Xorazm", description: "Region name"})
    @IsString()
    @IsNotEmpty()
    name: string;
}

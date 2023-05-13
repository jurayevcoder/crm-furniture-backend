import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCityDto {
    @ApiProperty({example: "Tashkent", description: "City name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "1", description: "Region id"})
    @IsNumber()
    @IsNotEmpty()
    region_id: number;
}

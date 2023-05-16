import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: "Kreslo", description: "Product name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "hhtps://image", description: "Product image" })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: "250000", description: "Product price" })
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty({ example: "1", description: "Category id" })
    @IsNumber()
    @IsNotEmpty()
    category_id: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: "1", description: "Product id" })
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({ example: "John Doe", description: "Full name" })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({ example: "Toshkent 10 kv Atlas Media Park", description: "Address" })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: "bilmadim", description: "Target" })
    @IsString()
    @IsNotEmpty()
    target: string;

    @ApiProperty({ example: "1 | 2 | 3", description: "Status" })
    @IsNumber()
    @IsNotEmpty()
    status: number;

    @ApiProperty({ example: "1", description: "Contact id" })
    @IsNumber()
    @IsNotEmpty()
    contact_id: number;

    @ApiProperty({ example: "1", description: "City id" })
    @IsNumber()
    @IsNotEmpty()
    city_id: number;

    @ApiProperty({ example: "1", description: "Staff id" })
    @IsNumber()
    @IsNotEmpty()
    staff_id: number;

    @ApiProperty({ example: "description", description: "Order description" })
    @IsString()
    @IsNotEmpty()
    description: string;
}

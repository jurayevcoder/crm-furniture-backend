import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
@ApiTags("Order")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: "Order create" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Order find all" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: "Order find by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({ summary: "Order update by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Order delete by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

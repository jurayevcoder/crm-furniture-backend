import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      await this.orderRepo.findOne({ where: { product_id: createOrderDto.product_id, status: 3, contact_id: createOrderDto.contact_id } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException
    }
    const order = await this.orderRepo.findOne({ where: { product_id: createOrderDto.product_id, status: 3, contact_id: createOrderDto.contact_id } })

    if (!order) {
      await this.orderRepo.create({ ...createOrderDto });
      const response = {
        msg: "Order created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "Order alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.orderRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepo.update(updateOrderDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.orderRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

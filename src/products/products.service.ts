import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productRepo: typeof Product) { }

  async create(createProductDto: CreateProductDto) {
    try {
      await this.productRepo.findOne({ where: { name: createProductDto.name, category_id: createProductDto.category_id } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException
    }
    const product = await this.productRepo.findOne({ where: { name: createProductDto.name, category_id: createProductDto.category_id } })

    if (!product) {
      await this.productRepo.create({ ...createProductDto });
      const response = {
        msg: "Product created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "Product alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.productRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(updateProductDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.productRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

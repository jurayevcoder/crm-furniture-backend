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

  async findAll(query: string) {
    console.log(query);
    let a = 9;
    let list = [];
    let lists = [];
    let page = { query };
    let response: any;
    const product = await this.productRepo.findAll({ include: { all: true } });
    for (let i = 0; i < product.length; i++) {
      if (i <= a) {
        list.push(product[i])
      }
      if (i == a) {
        lists.push(list)
        a += list.length
        list = []
      }
      if (i == product.length - 1 && list[0]) {
        lists.push(list)
        a += list.length
        list = []
      }
    }


    for (let i in page) {
      for (let j in page[i]) {
        let idx = Number(page[i][j]);
        response = {
          records: lists[idx - 1],
          pagination: {
            currentPage: query,
            totalCount: product.length,
            totalPage: lists.length
          }
        }
      }
    }
    return response;

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

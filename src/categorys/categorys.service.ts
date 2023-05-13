import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategorysService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      await this.categoryRepo.findOne({ where: { name: createCategoryDto.name } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException;
    }
    const category = await this.categoryRepo.findOne({ where: { name: createCategoryDto.name } })

    if (!category) {
      await this.categoryRepo.create({ ...createCategoryDto });
      const response = {
        msg: "Category created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "Category alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.categoryRepo.findAll({include: {all: true}});
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepo.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepo.update(updateCategoryDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.categoryRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './models/city.model';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private cityRepo: typeof City) { }

  async create(createCityDto: CreateCityDto) {
    try {
      await this.cityRepo.findOne({ where: { name: createCityDto.name } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException
    }
    const city = await this.cityRepo.findOne({ where: { name: createCityDto.name } })

    if (!city) {
      await this.cityRepo.create({ ...createCityDto });
      const response = {
        msg: "City created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "City alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.cityRepo.findAll({include: {all: true}});
  }

  async findOne(id: number): Promise<City> {
    return await this.cityRepo.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    await this.cityRepo.update(updateCityDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.cityRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

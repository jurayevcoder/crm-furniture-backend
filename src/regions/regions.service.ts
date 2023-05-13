import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionsService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      await this.regionRepo.findOne({ where: { name: createRegionDto.name } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException
    }
    const region = await this.regionRepo.findOne({ where: { name: createRegionDto.name } })

    if (!region) {
      await this.regionRepo.create({ ...createRegionDto });
      const response = {
        msg: "Region created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "Region alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.regionRepo.findAll({include: {all: true}});
  }

  async findOne(id: number): Promise<Region> {
    return await this.regionRepo.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    await this.regionRepo.update(updateRegionDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.regionRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

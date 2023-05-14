import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact) private contactRepo: typeof Contact) { }

  async create(createContactDto: CreateContactDto) {
    try {
      await this.contactRepo.findOne({ where: { phone_number: createContactDto.phone_number } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException
    }
    const contact = await this.contactRepo.findOne({ where: { phone_number: createContactDto.phone_number } })

    if (!contact) {
      await this.contactRepo.create({ ...createContactDto });
      const response = {
        msg: "Contact created successfuly!"
      }
      return response;
    } else {
      throw new UnprocessableEntityException({
        msg: "Contact alredy exists!"
      })
    }
  }

  async findAll() {
    return await this.contactRepo.findAll({include: {all: true}});
  }

  async findOne(id: number): Promise<Contact> {
    return await this.contactRepo.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.contactRepo.update(updateContactDto, { where: { id } })

    const response = {
      msg: "Update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.contactRepo.destroy({ where: { id } });

    const response = {
      msg: "Delete successfuly!"
    }
    return response;
  }
}

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

  async findAll(query: string) {
    console.log(query);
    let totalPage = 0;
    let a = 9;
    let list = []
    let lists = []
    let page = { query }
    let response: any;
    const contact = await this.contactRepo.findAll({ include: { all: true } });
    for (let i = 0; i < contact.length; i++) {
      if (i <= a) {
        list.push(contact[i])
      }
      if (i == a) {
        lists.push(list)
        a += list.length
        list = []
      }
      if (i == contact.length - 1 && list[0]) {
        if (list[0]) {
          lists.push(list)
          a += list.length
          list = []
        }
      }
    }


    for (let i in page) {
      for (let j in page[i]) {
        let idx = Number(page[i][j]);
        response = {
          records: lists[idx - 1],
          pagination: {
            currentPage: query,
            totalCount: contact.length,
            totalPage: lists.length
          }
        }
      }
    }
    return response;
  }

  async findOne(id: number): Promise<Contact> {
    return await this.contactRepo.findByPk(id, { include: { all: true } });
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

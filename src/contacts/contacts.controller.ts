import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Contact")
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiOperation({ summary: "Contact create" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @ApiOperation({ summary: "Contact find all" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll() {
    return this.contactsService.findAll();
  }

  @ApiOperation({ summary: "Contact find by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @ApiOperation({ summary: "Contact update by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: "Contact delete by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}

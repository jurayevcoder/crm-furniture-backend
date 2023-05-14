import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Contact]), JwtModule],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}

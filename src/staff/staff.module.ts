import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

@Module({
  imports: [SequelizeModule.forFeature[Staff]],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}

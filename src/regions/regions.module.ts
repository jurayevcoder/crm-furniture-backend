import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Region]), JwtModule],
  controllers: [RegionsController],
  providers: [RegionsService]
})
export class RegionsModule {}

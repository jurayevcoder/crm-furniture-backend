import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("City")
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) { }

  @ApiOperation({ summary: "City create" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @ApiOperation({ summary: "City find all" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll() {
    return this.citiesService.findAll();
  }

  @ApiOperation({ summary: "City find by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

  @ApiOperation({ summary: "City update by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }

  @ApiOperation({ summary: "City delete by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.citiesService.remove(+id);
  }
}

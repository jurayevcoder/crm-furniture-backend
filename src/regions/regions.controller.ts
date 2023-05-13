import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Region")
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) { }

  @ApiOperation({ summary: "Region create" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @ApiOperation({ summary: "Region find all" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll() {
    return this.regionsService.findAll();
  }

  @ApiOperation({ summary: "Region find by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @ApiOperation({ summary: "Region update by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: "Region delete by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}

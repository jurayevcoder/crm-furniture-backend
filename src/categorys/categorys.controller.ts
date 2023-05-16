import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';

@ApiTags("Category")
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) { }

  @ApiOperation({ summary: "Category create" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "Category find all" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll(@Query() query: string) {
    return this.categorysService.findAll(query);
  }

  @ApiOperation({ summary: "Category find by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.categorysService.findOne(+id);
  }

  @ApiOperation({ summary: "Category update by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorysService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Category delete by id" })
  @Roles("SUPER-ADMIN", "ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.categorysService.remove(+id);
  }
}

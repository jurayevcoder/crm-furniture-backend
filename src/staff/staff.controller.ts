import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { Staff } from './models/staff.model';
import { Response } from 'express';
import { SignInStaffDto } from './dto/signin.staff.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { UserSalfGuard } from 'src/guards/user-self.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("Staff")
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @ApiOperation({ summary: "User created" })
  @Roles("SUPER-ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: "User SignIn" })
  @Post('signin')
  async signin(@Body() signInStaffDto: SignInStaffDto, @Res({ passthrough: true }) res: Response) {
    return this.staffService.signin(signInStaffDto, res);
  }

  @ApiOperation({ summary: "User SignOut" })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.signout(refreshToken, res)
  }

  @ApiOperation({ summary: "User find all" })
  @Get("find-all")
  async findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: "User find by id" })
  // @UseGuards(UserSalfGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<Staff> {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({ summary: "User update by id" })
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({ summary: "User delete by  id" })
  @UseGuards(UserSalfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}

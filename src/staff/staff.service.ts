import { BadRequestException, ForbiddenException, HttpCode, HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SignInStaffDto } from './dto/signin.staff.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff) private staffRepo: typeof Staff,
    private readonly jwtService: JwtService,
  ) { }
  async create(createStaffDto: CreateStaffDto) {
    try {
      await this.staffRepo.findOne({ where: { phone_number: createStaffDto.phone_number } })
      await this.staffRepo.findOne({ where: { card: createStaffDto.card } })
      await this.staffRepo.findOne({ where: { login: createStaffDto.login } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException;
    }
    const staff_phone = await this.staffRepo.findOne({ where: { phone_number: createStaffDto.phone_number } })
    const staff_card = await this.staffRepo.findOne({ where: { card: createStaffDto.card } })
    const staff_login = await this.staffRepo.findOne({ where: { login: createStaffDto.login } })

    if (!staff_phone) {
      if (!staff_card) {
        if (!staff_login) {
          const newStaff = await this.staffRepo.create({ ...createStaffDto })
          const response = {
            status: HttpCode(200),
            msg: `${createStaffDto.role} created!`,
            newStaff: {
              full_name: `${createStaffDto.full_name}`,
              role: `${createStaffDto.role}`,
              is_active: false
            }
          }
          return response;
        } else {
          throw new UnprocessableEntityException({
            value: `${staff_login.login}`,
            msg: "Login already exists!",
          })
        }
      } else {
        throw new UnprocessableEntityException({
          value: `${staff_card.card}`,
          msg: "Card number already exists!",
        })
      }
    } else {
      throw new UnprocessableEntityException({
        value: `${staff_phone.phone_number}`,
        msg: "Phone number already exists!",
      })
    }
  }

  async signin(signInStaffDto: SignInStaffDto, res: Response) {
    try {
      await this.staffRepo.findOne({ where: { login: signInStaffDto.login } })
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        msg: "User Not Fount"
      })
    }
    const staff = await this.staffRepo.findOne({ where: { login: signInStaffDto.login } })
    if (staff) {
      if (staff.password === signInStaffDto.password) {
        const tokens = await this.getTokens(staff)

        const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

        const updatedUser = await this.staffRepo.update(
          { hashed_token: hashed_token },
          { where: { id: staff.id }, returning: true },)

        res.cookie('refreshToken', tokens.refresh_token, {
          maxAge: 15 * 42 * 60 * 60 * 1000,
          httpOnly: true,
        });

        const response = {
          msg: `${staff.role} signin`,
          tokens,
        }
        return response;
      } else {
        throw new BadRequestException({
          value: `${signInStaffDto.password}`,
          msg: "Password error!"
        })
      }
    } else {
      throw new NotFoundException({
        msg: "User not found!"
      })
    }
  }

  async signout(refreshToken: string, res: Response) {
    const staff = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if (!staff) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.staffRepo.update(
      { hashed_token: null },
      { where: { id: staff.id }, returning: true },
    )
    res.clearCookie('refreshToken');
    const response = {
      msg: `${staff.role} sign out successfully`,
    }
    return response;

  }

  async findAll() {
    const staff = await this.staffRepo.findAll({include: {all: true}});
    return staff;
  }

  async findOne(id: number): Promise<Staff> {
    return await this.staffRepo.findByPk(id, {include: {all: true}});
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepo.update(updateStaffDto, {
      where: { id },
    })

    const response = {
      msg: "Update successfuly!"
    }
    return response
  }

  async remove(id: number) {
    const staff = await this.staffRepo.destroy({ where: { id } });
    const response = {
      msg: "Delete successfuly!"
    }

    return response;
  }

  async getTokens(staff: Staff) {
    const jwtPayload = {
      id: staff.id,
      full_name: staff.full_name,
      phone_number: staff.phone_number,
      role: staff.role,
      is_active: staff.is_active
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      })
    ])
    return {
      access_tokken: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found!');
    }
    const staff = await this.staffRepo.findOne({ where: { id: user_id } });
    if (!staff || !staff.hashed_token) {
      throw new BadRequestException('User not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      staff.hashed_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(staff)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.staffRepo.update(
      { hashed_token: hashed_token },
      { where: { id: staff.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    }
    return response;
  }
}

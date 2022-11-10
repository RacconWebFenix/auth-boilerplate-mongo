import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({
      data,
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findAll() {
    return this.findAll();
  }

  findOne(id: string) {
    return this.findOne(id);
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.findOne(
  //     { _id: id },
  //     {
  //       $set: updateUserDto,
  //     },
  //     {
  //       new: true,
  //     },
  //   );
  // }

  // remove(id: string) {
  //   return this.userModel.deleteOne({ _id: id }).exec();
  // }
}

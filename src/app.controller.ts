import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly useRepository: Repository<UserModel>,
  ) {}

  @Get()
  getUsers() {
    return this.useRepository.find();
  }

  @Post()
  postUser() {
    return this.useRepository.save({
      role: Role.ADMIN,
    });
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string) {
    const user = await this.useRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.useRepository.save({
      ...user,
      title: user.title + '0',
    });
  }
}

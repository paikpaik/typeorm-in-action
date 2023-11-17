import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
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
      title: 'test title',
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

import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostMedel } from './entity/post.entity';

@Controller('users')
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostMedel)
    private readonly postRepository: Repository<PostMedel>,
  ) {}

  @Get()
  getUsers() {
    return this.userRepository.find({
      // 조인
      relations: {
        profile: true,
        posts: true,
      },
    });
  }

  @Post()
  postUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
    });
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
    });
  }

  @Post('profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'test@test.com',
    });
    const profile = await this.profileRepository.save({
      profileImg: 'test.png',
      user,
    });
    return user;
  }

  @Post('posts')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'post@test.com',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }
}

import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      select: {},
    });
  }

  @Post('users')
  postUser() {
    return this.userRepository.save({
      role: Role.ADMIN,
    });
  }

  @Patch('users/:id')
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

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'test@test.com',
    });
    await this.profileRepository.save({
      profileImg: 'test.png',
      user,
    });
    return user;
  }

  @Post('users/posts')
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

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'node',
    });
    const post2 = await this.postRepository.save({
      title: 'express',
    });
    const tag1 = await this.tagRepository.save({
      name: 'JS',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'TS',
      posts: [post1],
    });
    await this.postRepository.save({
      title: 'nest',
      tags: [tag1, tag2],
    });
    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}

/*
###############################################
############### FindManyOptions ###############
###############################################

.find({ select:{} })
- 어떤 프로퍼티를 선택할지 
- select를 정의하지 않으면 기본적으로 모든 프로퍼티를 가져옴.

.find({ select:{ 프로퍼티: true } })
- select를 정의하면 정의된 프로퍼티들만 가져옴.

.find({ where:{} })
- 필터링할 조건을 입력함.
- 모든 조건들은 And로 묶임.
- 만약 조건들을 Or로 묶어서 받으려면 list로 조건을 보내야함.
  where: [
    {
      id: 3,
    },
    {
      version: 1,
    }
  ]

.find({ relations:{ 관계: true } })
- 관계 data를 가져오는 법.
- relations을 true로 설정하는 순간 select나 where에서 
  사용할 수 있게 됨. (join되었다고 생각하면 편함.)

.find({ order:{ 프로퍼티: 'ASC' } })
- 오름차순(ASC), 내림차순(DESC) 설정 가능함.
- 당연히 relations 되어있는 프로퍼티도 설정 가능함.

.find({ skip: 0 })
- 처음 몇개를 제외하고 가져올지 

.find({ take: 0 })
- 처음부터 몇개만 가져올지
- LIMIT이랑 똑같다.
*/
/*
###################################################
############### WhereUtilityOptions ###############
###################################################

- 기본적으로 where절의 모든 유틸리티는 typeorm에서 불러와야 함.

where: { id: Not(1) }
- 1을 제외하고 모든 data 가져오기

where: { id: LessThan(30) }
- 1부터 30미만 data만 가져오기(1 ~ 29)

where: { id: LessThanOrEqual(30) }
- 1부터 30이하 data만 가져오기(1 ~ 30)

where: { id: MoreThan(30) }
- 30초과 data 가져오기(31 ~)

where: { id: MoreThanOrEqual(30) }
- 30이상 data 가져오기(30 ~)

where: { id: Equal(30) }
- id가 30인 data만 가져오기

where: { email: Like('%google%') }
- '%word%' word가 속한 값 가져오기 ['%word', 'word%']
- 대소문자를 구분하기 때문에 똑같아야 함.

where: { email: ILike('%GOOGLE%') }
- '%word%' word가 속한 값 가져오기 ['%word', 'word%']
- 대소문자를 구분안하고 유사값을 가져옴. 

where: { id: Between(10, 15) }
- id가 10이상 15이하 사이값 가져오기(10 ~ 15)

where: { id: In([1, 3, 5, 7, 99]) }
- 리스트에 해당되는 값만 가져옴.

where: { id: isNull() }
- id가 null인 경우 가져오기
*/

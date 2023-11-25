import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { ILike, LessThan, Repository } from 'typeorm';
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

  @Post('sample')
  async sample() {
    // [create]
    // 모델에 해당되는 객체 생성 - 저장은 안함.
    // const user1 = await this.userRepository.create({
    //   email: 'test@test.com',
    // });
    // return user1;
    //
    // [save]
    // 모델에 해당되는 객체 생성 - 저장까지 함.
    // const user2 = await this.userRepository.save({
    //   email: 'test@test.com',
    // });
    // return user2;
    //
    // [preload]
    // 입력된 값을 기반으로 db에 있는 데이터를 불러오고
    // 추가 입력된 값으로 db에서 가져온 값들을 대체함.
    // 저장은 안함.
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'preload@test.com',
    // });
    // return user3;
    //
    // [delete]
    // delete({ id: 101 })처럼 객체로 전달해도 되지만
    // 일반적으로 id값이 사용되기 때문에 id만 전달함.
    // await this.userRepository.delete(101);
    // return true;
    //
    // [increment], [decrement]
    // increment({조건}, 프로퍼티, 증가값)
    // 조건에 해당하는 모든 로우에게 특정 프로퍼티 값을
    // 특정 값 만큼 증가시킴
    // decrement는 반대임.
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );
    // return true;
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );
    // return true;
    //
    // [count]
    // 조건에 맞는 프로퍼티의 수
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%test%'),
    //   },
    // });
    // return count;
    //
    // [sum]
    // 조건에 맞는 프로퍼티의 합
    // sum('합치고 싶은 프로퍼티', 조건)
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%test%'),
    // });
    // return sum;
    //
    // [average]
    // 조건의 맞는 프로퍼티의 평균
    // average('평균내고 싶은 프로퍼티', 조건)
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });
    // return average;
    //
    // [minimum]
    // 조건의 맞는 프로퍼티의 최소값
    // minimum('프로퍼티', 조건)
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });
    // return min;
    //
    //[maximum]
    // 조건의 맞는 프로퍼티의 최대값
    // maximum('프로퍼티', 조건)
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });
    // return max;
    //
    // [findAndCount]
    // 특정 갯수만 제한해서 가져옴.
    // 제한된 값이랑 전체값도 같이 반환함.(pagination에서 활용됨.)
    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 3,
    // });
    // return usersAndCount;
  }

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

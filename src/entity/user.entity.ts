import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  @PrimaryGeneratedColumn()
  id: number;

  // Email
  @Column()
  email: string;

  // // 제목
  // @Column({
  //   type: 'varchar',
  //   name: '_title',
  //   length: 300,
  //   nullable: true,
  //   update: true,
  //   select: false,
  //   default: 'default value',
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 업데이트 일자
  @UpdateDateColumn()
  updatedAt: Date;

  // 버전 업데이트
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  // 1:1 관계
  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    eager: true,
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  profile: ProfileModel;

  // 1:다 관계
  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
/*
#################################################
############### Column Annotation ###############
################################################# 

@PrimaryGeneratedColumn()
- entity의 속성을 PK column으로 만들어줌.
- 자동으로 number ID가 증가함.
- 모든 테이블에 기본적으로 존재해야 함.
- 테이블 안에서 각각의 Row를 구분 할 수 있는 칼럼임.

@PrimaryColumn()
- PrimaryGeneratedColumn과 동일한 기능을 수행하지만 직접 
- 고유값을 넣어줘야 함.

@PrimaryGeneratedColumn('uuid')
- PrimaryGeneratedColumn과 동일한 기능을 수행하지만 number의 
- 자동증가가 아닌 랜덤 string값을 자동으로 생성해줌.

@Column()
- entity의 속성을 column으로 만들어줌.

@CreateDateColumn()
- 데이터가 생성되는 날짜와 시간이 자동으로 찍힘.

@UpdateDateColumn()
- 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힘.

@VersionColumn()
- 데이터가 업데이트 될때마다 1씩 올라감.
- 처음 생성되면 값은 1임.
- 내부적으로 save() 함수가 몇번 불렸는지 기억함.

@Column()
@Generated('increment')
- PK는 아니지만 자동으로 1씩 증가하는 column임.
- 옵션은 'increment', 'lowid', 'uuid' 3가지가 있음.
*/
/*
###############################################
############### Column Property ###############
############################################### 

@Column({ type: 'text' })
- 데이터베이스에서 인지하는 Column 타입
- 자동으로 유추되기 때문에 설정을 안해도 됨.

@Column({ name: '_title' })
- 데이터베이스 칼럼 이름
- 프로퍼티 이름으로 자동 유추됨.

@Column({ length: 300 })
- 값의 max 길이
- varchar type만 지정할 수 있음.
- 입력 할 수 있는 글자의 길이가 300

@Column({ nullable: false })
- null이 가능한지

@Column({ update: true })
- true면 처음 지정할때만 값 지정 가능
- 이후 값 변경 불가

@Column({ select: false })
- find()를 실행할때 기본으로 값을 불러올지
- 기본값이 true

@Column({ default: 'default value' })
- 아무것도 입력 안했을 때, 기본으로 입력 되는 값

@Column({ unique: false })
- 기본값이 false
- column중에서 유일무이한 값이 돼야 하는지
- 보통 email에 넣어둠.
*/
/*
#####################################################
############### OneToOne Relationship ###############
#####################################################

@OneToOne(() => ProfileModel, (profile) => profile.user)
- 1:1 관계임. 
- ProfileModel과 연결되어 있고 profile.user로 불러올수 있음.

@JoinColumn()
- ProfileModel에 있는 id를 ProfileModel에서 가지고 있겠다는 의미임.
- UserModel이나 ProfileModel 둘 중 하나에서 가지고 있어야 함.
*/
/*
#####################################################
############### OneToMany Relationship ###############
#####################################################

@OneToMany(() => PostMedel, (post) => post.author)
- JoinColumn이 필요없음.
- id는 항상 ManyToOne쪽에서 가지고 있게 됨.
- posts: PostMedel[]; 리스트로 타입지정하는거 잊지말기
*/
/*
################################################
############### Relation Options ###############
################################################

- OnoToOne, OneToMany, ManyToOne, ManyToMany 전부 옵션값 같음.

{ eager: true }
- find() 실행 할때마다 항상 같이 가져올 relation
- relation으로 join을 안걸어줘도 항상 가져온다는 뜻임.
- 기본값은 false임.

{ cascade: true }
- 저장할때 relation을 한번에 같이 저장 가능.
- 따로따로 레포를 불러서 저장안해도 된다는 뜻임.
- 기본값음 false임.

{ nullable: false }
- null이 가능한지
- 기본값음 true임.
- nullable: false는 cascade랑 쓰기 좋음.

{ onDelete: no action }
- 관계가 삭제됐을때 옵션을 정하는 것임.
- 'ON ACTION' -> 아무것도 안함.
- 'CASCADE' -> 참조하는 Row도 같이 삭제
-              즉, profile 삭제하면 user도 삭제된다는 뜻.
- 'SET NULL' -> 참조하는 Row에서 참조 id를 null로 변경
-              즉, profile 삭제하면 user의 profile은 null임.
- 'SET DEFAULT' -> 기본 세팅으로 설정 (테이블의 기본 세팅)
- 'RESTRICT' -> 참조하고 있는 Row가 있는경우 참조당하는 Row 삭제 불가
-              즉, user에 profile이 참조되고 있다면 삭제 못함.
*/

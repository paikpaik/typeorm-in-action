import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserModel } from './user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
/*
#####################################################
############### ManyToOne Relationship ###############
#####################################################

@ManyToOne(() => UserModel, (user) => user.posts)
- JoinColumn이 필요없음.
- id는 항상 ManyToOne쪽에서 가지고 있게 됨.
*/
/*
#####################################################
############### ManyToMany Relationship ###############
#####################################################

@ManyToMany(() => TagModel, (tag) => tag.posts)
- JoinTable을 둘중 아무곳에나 하나 넣어주면 됨.
- JoinColumn 아님 JoinTable임.
- JoinColumn은 1:1, 1:다, 다:1
- JoinTable은 다:다
- 그러면 해당 테이블에서 id값을 가지고 있는게 아닌 
- 다대다 관계를 연결시켜주는 테이블이 새롭게 생성됨.
*/

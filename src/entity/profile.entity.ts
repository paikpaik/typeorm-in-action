import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1:1 관계
  @OneToOne(() => UserModel, (user) => user.profile)
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}

/*
#####################################################
############### OneToOne Relationship ###############
#####################################################

@OneToOne(() => UserModel, (user) => user.profile)
- 1:1 관계임. 
- UserModel과 연결되어 있고 user.profile로 불러올수 있음.

@JoinColumn()
- UserModel에 있는 id를 ProfileModel에서 가지고 있겠다는 의미임.
*/

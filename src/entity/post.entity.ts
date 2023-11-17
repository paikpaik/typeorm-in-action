import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class PostMedel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

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

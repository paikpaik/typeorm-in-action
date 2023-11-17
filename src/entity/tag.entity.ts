import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostModel } from './post.entity';

@Entity()
export class TagModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PostModel, (post) => post.tags)
  posts: PostModel[];

  @Column()
  name: string;
}
/*
#####################################################
############### ManyToMany Relationship ###############
#####################################################

@ManyToMany(() => PostMedel, (post) => post.tags)
- JoinTable을 둘중 아무곳에나 하나 넣어주면 됨.
- JoinColumn 아님 JoinTable임.
- JoinColumn은 1:1, 1:다, 다:1
- JoinTable은 다:다
- 그러면 해당 테이블에서 id값을 가지고 있는게 아닌 
- 다대다 관계를 연결시켜주는 테이블이 새롭게 생성됨.
*/

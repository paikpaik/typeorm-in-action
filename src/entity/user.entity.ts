import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  // ID
  @PrimaryGeneratedColumn()
  id: number;

  // 제목
  @Column()
  title: string;

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
}
/*
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

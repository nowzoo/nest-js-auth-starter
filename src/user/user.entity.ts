import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type CreateUserDto = Omit<User, 'id'>;

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  isActive: boolean;
}

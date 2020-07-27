import { Field, ObjectType, ID } from '@nestjs/graphql';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';

import { User } from 'src/user';

@ObjectType()
@Entity()
export class Patient {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field({ nullable: true })
  @Column({ default: '' })
  appointmentTime?: string;

  @Field({ nullable: true })
  @Column({ default: '' })
  userRole?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(type => User, user => user.patients)
  user?: User;


}

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Patient } from 'src/patient';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field({ nullable: false })
  @Column({ default: '' })
  name: string;

  @Field({ nullable: false })
  @Column({ default: '' })
  role: string;

  @Field({ nullable: false })
  @Column({ default: '' })
  password: string;

  @Field({ nullable: true })
  @Column({ default: '' })
  birthday?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'float' })
  phone: number | null;

  @Field({ nullable: true })
  @Column({ default: '' })
  email?: string;

  @Field({ nullable: true })
  @Column({ default: '' })
  address?: string;

  @Field({ nullable: true })
  @Column({ default: '' })
  photoID?: string;

  @OneToMany(type => Patient, patient => patient.user)
  patients: Patient[];
  
}

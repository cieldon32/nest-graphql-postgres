import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  phone?: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  photoID?: string;
}
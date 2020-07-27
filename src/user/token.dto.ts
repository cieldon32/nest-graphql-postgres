import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenPayload {
  @Field({ nullable: true })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Employee')
export class EmployeeType {
  @Field((type) => ID)
  id: string;

  @Field()
  phone: string;

  @Field()
  position: string;

  @Field()
  fullName: string;
}

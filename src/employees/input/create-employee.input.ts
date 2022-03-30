import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @IsString()
  @Field()
  phone: string;

  @IsString()
  @Field()
  position: string;

  @IsString()
  @Field()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;
}

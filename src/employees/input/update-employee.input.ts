import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { CreateEmployeeInput } from './create-employee.input';

@InputType()
export class UpdateEmployeeInput extends PartialType(
  OmitType(CreateEmployeeInput, ['username'] as const),
) {
  @IsUUID(4)
  @Field((type) => ID)
  id: string;
}

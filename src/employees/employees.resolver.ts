import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EmployeeType } from './employee.type';
import { EmployeesService } from './employees.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateEmployeeInput } from './input/create-employee.input';
import { UpdateEmployeeInput } from './input/update-employee.input';

@Resolver((of) => EmployeeType)
@UseGuards(GqlAuthGuard)
export class EmployeesResolver {
  constructor(private employeesService: EmployeesService) {}

  @Query((returns) => [EmployeeType])
  employees() {
    return this.employeesService.getEmployees();
  }

  @Query((returns) => EmployeeType)
  employee(@Args('id') id: string) {
    return this.employeesService.getEmployeeById(id);
  }

  @Mutation((returns) => EmployeeType)
  createEmployee(@Args('input') input: CreateEmployeeInput) {
    return this.employeesService.createEmployee(input);
  }

  @Mutation((returns) => EmployeeType)
  updateEmployee(@Args('input') input: UpdateEmployeeInput) {
    return this.employeesService.updateEmployee(input);
  }

  @Mutation((returns) => EmployeeType)
  deleteEmployee(@Args('id') id: string) {
    return this.employeesService.deleteEmployeeById(id);
  }
}

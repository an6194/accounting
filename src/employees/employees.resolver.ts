import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EmployeeType } from './employee.type';
import { EmployeesService } from './employees.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateEmployeeInput } from './input/create-employee.input';
import { UpdateEmployeeInput } from './input/update-employee.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver((of) => EmployeeType)
@UseGuards(GqlAuthGuard, RolesGuard)
export class EmployeesResolver {
  constructor(private employeesService: EmployeesService) {}

  @Query((returns) => [EmployeeType])
  @Roles(Role.Director, Role.HR, Role.Employee)
  employees() {
    return this.employeesService.getEmployees();
  }

  @Query((returns) => EmployeeType)
  @Roles(Role.Director, Role.HR, Role.Employee)
  employee(@Args('id') id: string) {
    return this.employeesService.getEmployeeById(id);
  }

  @Mutation((returns) => EmployeeType)
  @Roles(Role.Director, Role.HR)
  createEmployee(@Args('input') input: CreateEmployeeInput) {
    return this.employeesService.createEmployee(input);
  }

  @Mutation((returns) => EmployeeType)
  @Roles(Role.Director, Role.HR)
  updateEmployee(@Args('input') input: UpdateEmployeeInput) {
    return this.employeesService.updateEmployee(input);
  }

  @Mutation((returns) => EmployeeType)
  @Roles(Role.Director)
  deleteEmployee(@Args('id') id: string) {
    return this.employeesService.deleteEmployeeById(id);
  }
}

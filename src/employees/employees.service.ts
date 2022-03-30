import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmployeeProfile } from './employee-profile.entity';
import { CreateEmployeeInput } from './input/create-employee.input';
import { AuthService } from '../auth/auth.service';
import { UpdateEmployeeInput } from './input/update-employee.input';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeProfile)
    private employeesRepository: Repository<EmployeeProfile>,
    private authService: AuthService,
  ) {}

  getEmployees() {
    return this.employeesRepository.find();
  }

  async getEmployeeById(id: string) {
    const employee = await this.employeesRepository.findOne(id);

    if (!employee) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    return employee;
  }

  async createEmployee(input: CreateEmployeeInput) {
    const { phone, position, fullName, username } = input;

    const user = await this.authService.getUserWithProfile(username);

    if (user.employeeProfile) {
      throw new BadRequestException('User already has a profile');
    }

    const employee = this.employeesRepository.create({
      phone,
      position,
      fullName,
      user,
    });

    return this.employeesRepository.save(employee);
  }

  async updateEmployee(input: UpdateEmployeeInput) {
    const employee = await this.employeesRepository.preload({ ...input });

    if (!employee) {
      throw new NotFoundException(`Profile with ID "${input.id}" not found`);
    }

    return this.employeesRepository.save(employee);
  }

  async deleteEmployeeById(id: string) {
    const employee = await this.getEmployeeById(id);

    return this.employeesRepository.remove(employee);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { EmployeeProfile } from './employee-profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProfile]), AuthModule],
  providers: [EmployeesService, EmployeesResolver],
})
export class EmployeesModule {}

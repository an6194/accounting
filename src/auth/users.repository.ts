import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsInput } from './input/auth-credentials.input';
import { Password } from './utils/password';
import { Role } from './enums/role.enum';

const POSTGRES_DUPLICATE_ERROR_CODE = '23505';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(input: AuthCredentialsInput) {
    const { username, password } = input;

    const hashedPassword = await Password.toHash(password);

    const user = this.create({
      username,
      password: hashedPassword,
      role: Role.Employee,
    });

    try {
      return this.save(user);
    } catch (error) {
      if (error.code === POSTGRES_DUPLICATE_ERROR_CODE) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

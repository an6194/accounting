import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from './users.repository';
import { AuthCredentialsInput } from './input/auth-credentials.input';
import { JwtPayload } from './jwt-payload.interface';
import { Password } from './utils/password';
import { AccessTokenType } from './access-token.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(input: AuthCredentialsInput) {
    const user = await this.usersRepository.createUser(input);

    const payload: JwtPayload = { username: user.username };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken } as AccessTokenType;
  }

  async signIn(input: AuthCredentialsInput) {
    const { username, password } = input;

    const user = await this.usersRepository.findOne({ username });

    if (user && (await Password.compare(user.password, password))) {
      const payload: JwtPayload = { username };

      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken } as AccessTokenType;
    }

    throw new UnauthorizedException('Please check your login credentials');
  }

  async getUserWithProfile(username: string) {
    const user = await this.usersRepository.findOne(
      { username },
      { relations: ['employeeProfile'] },
    );

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return user;
  }
}

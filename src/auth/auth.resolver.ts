import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthCredentialsInput } from './input/auth-credentials.input';
import { AccessTokenType } from './access-token.type';

@Resolver((of) => AccessTokenType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AccessTokenType)
  signUp(@Args('input') input: AuthCredentialsInput) {
    return this.authService.signUp(input);
  }

  @Mutation((returns) => AccessTokenType)
  signIn(@Args('input') input: AuthCredentialsInput) {
    return this.authService.signIn(input);
  }
}

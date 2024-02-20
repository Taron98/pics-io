/** @format */

import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { UserService } from './user.service';
import { SignInRequestType, SignInResponseType, SignUpRequestType, validate } from '../common';
import { SignUpResponseType } from '../common/model/user/user';
import { signUpJoi, singInJoi } from './user.validation';

@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }
  @SuccessResponse('201', 'Signed Up')
  @Post('sign-up')
  public async signUp(@Body() requestBody: SignUpRequestType): Promise<SignUpResponseType> {
    validate(requestBody, signUpJoi());
    return this.userService.signUp(requestBody);
  }
  @SuccessResponse('201', 'Signed In')
  @Post('sign-in')
  public async signIn(@Body() requestBody: SignInRequestType): Promise<SignInResponseType> {
    validate(requestBody, singInJoi());
    return this.userService.signIn(requestBody);
  }
}

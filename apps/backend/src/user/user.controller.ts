import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignUpDto } from './user.dto';
import { User } from './user.entity';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<User> {
    return this.userService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto): Promise<User> {
    return this.userService.signUp(dto);
  }
}

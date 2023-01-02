import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user.entity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/latest')
  getLatestUser(): Promise<User> {
    return this.userService.findLatestUser();
  }

  @Post()
  createUser(@Body() request: CreateUserDto) {
    this.userService.createUser(request);
  }
}

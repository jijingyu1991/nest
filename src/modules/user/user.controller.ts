import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({ summary: '创建用户' })
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
  @Post('findUser')
  async findUser(@Body() body: any) {
    return this.userService.findOne(body);
  }
  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: CreateUserDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.name,
      loginParmas.password,
    );
    console.log(authResult);
    switch (authResult.code) {
      case 0:
        return this.authService.certificate(authResult.user);
      case 1:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}

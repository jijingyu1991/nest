/*
 * @Date: 2023-01-17 14:58:37
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:17:57
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { md5 } from '../../utils/md5';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // JWT验证 - Step 2: 校验用户信息
  async validateUser(name: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne({ name });
    if (user) {
      const hashedPassword = user.password;
      if (hashedPassword == md5(password)) {
        return {
          code: 0,
          user,
        };
      } else {
        return {
          code: 1,
        };
      }
    }
    return {
      code: 99,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign({
        name: user.name,
        password: user.password,
      });
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}

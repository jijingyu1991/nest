/*
 * @Date: 2023-01-05 11:41:54
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-06 10:10:21
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('h')
  getHello(): string {
    return this.appService.getHello();
  }
  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser() {
    return 'getUser';
  }
}

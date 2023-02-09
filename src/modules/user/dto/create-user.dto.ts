/*
 * @Date: 2023-01-16 15:50:21
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-16 15:51:44
 */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @ApiProperty({ description: '用户名' })
  readonly name: string;
  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

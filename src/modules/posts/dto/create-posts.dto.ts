/*
 * @Date: 2023-01-10 13:41:45
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-12 15:38:14
 */
import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePostsDto {
  // @IsNotEmpty({ message: '标题不能为空' })
  @ApiProperty({ description: '文章标题' })
  readonly title: string;
  @ApiProperty({ description: '文章作者' })
  @IsNotEmpty({ message: '作者不能为空' })
  readonly author: string;
  @ApiProperty({ description: '文章内容' })
  readonly content: string;
  @ApiPropertyOptional({ description: '文章图片地址' })
  readonly thumb_url?: string;
}

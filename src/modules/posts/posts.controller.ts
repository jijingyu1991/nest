/*
 * @Date: 2023-01-06 10:24:48
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:50:01
 */
// 引入 Nest.js 内置的各个功能
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// 引入用户服务
import { PostsService } from './posts.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PageDto } from '../common/common.interface';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('posts')
@Controller('posts')
@ApiBearerAuth() // Swagger 的 JWT 验证
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @ApiOperation({ summary: '创建文章' })
  @Post('createPost')
  async createPost(@Body() body: CreatePostsDto) {
    return this.postsService.create(body);
  }
  @ApiOperation({ summary: '获取文章列表' })
  @Post('postList')
  async postList(@Body() body: PageDto) {
    return this.postsService.findAll(body);
  }
  @ApiOperation({ summary: '查询文章内容' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postsService.findById(id);
  }
  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.postsService.deleteById(id);
  }
  @ApiOperation({ summary: '修改文章' })
  @Put(':id')
  async updatePost(@Body() body: CreatePostsDto, @Param('id') id: string) {
    return await this.postsService.updatePost(id, body);
  }
}

/*
 * @Date: 2023-01-06 10:24:05
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-10 10:30:46
 */
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './posts.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }]),
  ],
})
export class PostsModule {}

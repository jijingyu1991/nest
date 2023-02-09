/*
 * @Date: 2023-01-06 10:24:55
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-11 15:46:52
 */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PageDto } from '../common/common.interface';
import { Posts, PostsDocument } from './posts.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 Posts 模型注入到 PostsService 中:
  constructor(@InjectModel('Posts') private postsModel: Model<PostsDocument>) {}
  //创建文章
  async create(createPostsDto: CreatePostsDto): Promise<string> {
    const { title } = createPostsDto;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const createdPosts = new this.postsModel(createPostsDto);
    await createdPosts.save();
    return 'success';
  }
  // 获取文章列表
  async findAll(pageObj: PageDto): Promise<Posts[]> {
    const { pageCount, pageSize = 10 } = pageObj;
    console.log(pageCount, pageSize);
    const temp = await this.postsModel
      .find()
      .skip((pageCount - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return temp;
  }
  // 查找
  async findById(id: string): Promise<Posts> {
    console.log(id);
    // 这里是异步的
    const temp = await this.postsModel.find({ _id: id });
    return temp && temp[0];
  }
  // 删除
  async deleteById(sid: string) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.postsModel.remove({ _id: sid });
    return temp;
  }
  // 修改
  async updatePost(sid: string, data: CreatePostsDto) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.postsModel.updateOne({ _id: sid }, { $set: data });
    return temp;
  }
}

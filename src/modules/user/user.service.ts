/*
 * @Date: 2023-01-16 15:46:49
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-17 16:02:43
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { md5 } from '../../utils/md5';

@Injectable()
export class UserService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  //创建用户
  async create(createUserDto: CreateUserDto): Promise<string> {
    const { name, password } = createUserDto;
    const createdPosts = new this.UserModel({ name, password: md5(password) });
    await createdPosts.save();
    return 'success';
  }
  // 查找
  async findOne(body: any): Promise<User> {
    const { name } = body;
    // 这里是异步的
    const temp = await this.UserModel.find({ name });
    return temp && temp[0];
  }
}

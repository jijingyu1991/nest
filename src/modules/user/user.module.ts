/*
 * @Date: 2023-01-16 15:45:25
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:05:28
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
@Module({
  // controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
})
export class UserModule {}

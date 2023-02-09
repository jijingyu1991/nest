/*
 * @Date: 2023-01-10 10:20:15
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-11 11:20:58
 */
// import * as mongoose from 'mongoose';
// export const PostsSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   author: String,
//   content: String,
//   thumb_url: String,
//   create_time: Date,
//   update_time: Date,
// });

// @Prop 装饰器接受一个可选的参数，通过这个，你可以指示这个属性是否是必须的，是否需要默认值，或者是标记它作为一个常量，下面是例子
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// SchemaFactory 是 mongoose 内置的一个方法做用是读取模式文档 并创建 Schema 对象
import { Document, SchemaTypes } from 'mongoose';
export type PostsDocument = Posts & Document;
@Schema({
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' },
})
export class Posts extends Document {
  @Prop({ type: SchemaTypes.String, required: true })
  title: string;
  @Prop({ type: SchemaTypes.String })
  author: string;
  @Prop({ type: SchemaTypes.String })
  content: string;
  @Prop({ type: SchemaTypes.String })
  thumb_url: string;
}
export const PostsSchema = SchemaFactory.createForClass(Posts);

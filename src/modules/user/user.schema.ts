/*
 * @Date: 2023-01-16 16:09:28
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-17 14:55:54
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
export type UserDocument = User & Document;
@Schema({
  timestamps: { createdAt: 'create_time', updatedAt: 'update_time' },
})
export class User extends Document {
  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  name: string;
  @Prop({ type: SchemaTypes.String, required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

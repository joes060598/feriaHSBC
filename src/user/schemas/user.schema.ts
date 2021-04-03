import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ default: Date.now })
  createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  email: string;

  @Prop()
  skills: string[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Job' })
  current_job: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Job' }] })
  jobs: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Job {
  @Prop()
  title: string;

  @Prop()
  salary: number;

  @Prop()
  enterprise: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Serializer } from '../common/serializer';
import { JobController } from './job.controller';
import { Job, JobSchema } from './job.schema';
import { JobService } from './job.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobController],
  providers: [JobService, Serializer],
})
export class JobModule {}

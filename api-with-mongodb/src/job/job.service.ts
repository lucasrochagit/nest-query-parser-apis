import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serializer } from '../common/serializer';
import { JobDTO } from './job.dto';
import { Job, JobDocument } from './job.schema';
import { MongoQueryModel } from 'nest-query-parser';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name)
    private readonly _model: Model<JobDocument>,
    private readonly _serializer: Serializer<JobDTO, Job>,
  ) {}

  async create(item: JobDTO): Promise<JobDTO> {
    const job = this._serializer.deserialize(item);
    const result = await this._model.create(job);
    return this._serializer.serialize(result.toObject(), {
      ignoreFromSource: ['updated_at'],
    });
  }

  async find(query: MongoQueryModel): Promise<JobDTO[]> {
    const result = await this._model
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .select(query.select)
      .exec();
    return result.map((item) => this._serializer.serialize(item.toObject()));
  }

  async findById(_id: string, query: MongoQueryModel): Promise<JobDTO> {
    const result = await this._model
      .findOne({ _id })
      .select(query.select)
      .exec();

    if (!result) {
      throw new NotFoundException('Job not found or already removed');
    }
    return this._serializer.serialize(result.toObject());
  }

  async updateById(
    _id: string,
    item: JobDTO,
    query: MongoQueryModel,
  ): Promise<JobDTO> {
    const job = this._serializer.serialize(item);
    const result = await this._model
      .findOneAndUpdate({ _id }, job, {
        new: true,
      })
      .select(query.select)
      .exec();
    if (!result) {
      throw new NotFoundException('Job not found or already removed');
    }
    return this._serializer.serialize(result.toObject());
  }

  async deleteById(_id: string): Promise<void> {
    await this._model.findByIdAndDelete(_id);
  }
}

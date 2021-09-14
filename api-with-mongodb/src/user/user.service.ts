import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serializer } from '../common/serializer';
import { UserDTO } from './user.dto';
import { User, UserDocument } from './user.schema';
import { MongoQueryModel } from 'nest-query-parser';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly _model: Model<UserDocument>,
    private readonly _serializer: Serializer<UserDTO, User>,
  ) {}

  async create(item: UserDTO): Promise<UserDTO> {
    const user = this._serializer.deserialize(item);
    const result = await this._model.create(user);
    return this._serializer.serialize(result.toObject(), {
      ignoreFromSource: ['updated_at'],
    });
  }

  async find(query: MongoQueryModel): Promise<UserDTO[]> {
    const result = await this._model
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .select(query.select)
      .populate(query.populate)
      .exec();
    return result.map((item) =>
      this._serializer.serialize(item.toObject()),
    );
  }

  async findById(_id: string, query: MongoQueryModel): Promise<UserDTO> {
    const result = await this._model
      .findOne({ _id })
      .select(query.select)
      .populate(query.populate)
      .exec();

    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }
    return this._serializer.serialize(result.toObject());
  }

  async updateById(
    _id: string,
    item: UserDTO,
    query: MongoQueryModel,
  ): Promise<UserDTO> {
    const user = this._serializer.serialize(item);
    const result = await this._model
      .findOneAndUpdate({ _id }, user, {
        new: true,
      })
      .select(query.select)
      .populate(query.populate)
      .exec();

    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }
    return this._serializer.serialize(result.toObject());
  }

  async deleteById(_id: string): Promise<void> {
    await this._model.findByIdAndDelete(_id);
  }
}

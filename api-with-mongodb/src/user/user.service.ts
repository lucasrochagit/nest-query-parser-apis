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
    private readonly toSchemaSerializer: Serializer<UserDTO, User>,
    private readonly toDTOSerializer: Serializer<User, UserDTO>,
  ) {}

  async create(item: UserDTO): Promise<UserDTO> {
    const user = this.toSchemaSerializer.serialize(item);
    const result = await this._model.create(user);
    return this.toDTOSerializer.serialize(result.toObject(), {
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
      this.toDTOSerializer.serialize(item.toObject()),
    );
  }

  async findById(id: string): Promise<UserDTO> {
    const result = await this._model.findById(id);
    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }
    return this.toDTOSerializer.serialize(result.toObject());
  }

  async updateById(id: string, item: UserDTO): Promise<UserDTO> {
    const user = this.toSchemaSerializer.serialize(item);
    const result = await this._model.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }
    return this.toDTOSerializer.serialize(result.toObject());
  }

  async deleteById(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';
import { MongoQuery, MongoQueryModel } from 'nest-query-parser';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() userDTO: CreateUserDTO): Promise<UserDTO> {
    return this.service.create(userDTO);
  }

  @Get()
  async find(@MongoQuery() query: MongoQueryModel): Promise<UserDTO[]> {
    return this.service.find(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDTO> {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.service.updateById(id, userDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.deleteById(id);
  }
}

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
import { MongoQuery, MongoQueryModel } from 'nest-query-parser';
import { CreateJobDTO, JobDTO, UpdateJobDTO } from './job.dto';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly service: JobService) {}

  @Post()
  async create(@Body() jobDTO: CreateJobDTO): Promise<JobDTO> {
    return this.service.create(jobDTO);
  }

  @Get()
  async find(@MongoQuery() query: MongoQueryModel): Promise<JobDTO[]> {
    return this.service.find(query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @MongoQuery() query: MongoQueryModel,
  ): Promise<JobDTO> {
    return this.service.findById(id, query);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() jobDTO: UpdateJobDTO,
    @MongoQuery() query: MongoQueryModel,
  ): Promise<JobDTO> {
    return this.service.updateById(id, jobDTO, query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.deleteById(id);
  }
}

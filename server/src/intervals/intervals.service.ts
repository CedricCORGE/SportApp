import { Injectable } from '@nestjs/common';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { UpdateIntervalDto } from './dto/update-interval.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from './entities/interval.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntervalsService {
  constructor(
    @InjectRepository(Interval)
    private readonly intervalRepository: Repository<Interval>,
  ) {}

  create(createIntervalDto: CreateIntervalDto) {
    var data = new Interval();

    data.name = createIntervalDto.name;
    data.repetitions = createIntervalDto.repetitions;
    data.work = createIntervalDto.work;
    data.rest = createIntervalDto.rest;

    return this.intervalRepository.save(data);
  }

  findAll() {
    return this.intervalRepository.find();
  }

  findOne(id: number) {
    return this.intervalRepository.findBy({ id });
  }

  update(id: number, updateIntervalDto: UpdateIntervalDto) {
    var data = new Interval();

    data.id = id;
    data.name = updateIntervalDto.name;
    data.repetitions = updateIntervalDto.repetitions;
    data.work = updateIntervalDto.work;
    data.rest = updateIntervalDto.rest;

    return this.intervalRepository.save(data);
  }

  remove(id: number) {
    return this.intervalRepository.delete(id);
  }
}

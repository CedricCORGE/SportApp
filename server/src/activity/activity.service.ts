import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    let activity = new Activity();
    activity.name = createActivityDto.name;
    activity.date = createActivityDto.date;
    activity.duration = createActivityDto.duration;
    activity.interval = createActivityDto.interval;
    return this.activityRepository.save(createActivityDto);
  }

  findAll() {
    return this.activityRepository.find();
  }

  findOne(id: number) {
    return this.activityRepository.findBy({ id });
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    let newActivity = new Activity();
    newActivity.name = updateActivityDto.name;
    newActivity.date = updateActivityDto.date;
    newActivity.duration = updateActivityDto.duration;
    newActivity.interval = updateActivityDto.interval;
    newActivity.id = id;
    return this.activityRepository.save(newActivity);
  }

  remove(id: number) {
    return this.activityRepository.delete({ id });
  }
}

import { Module } from '@nestjs/common';
import { IntervalsService } from './intervals.service';
import { IntervalsController } from './intervals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interval } from './entities/interval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interval])],
  controllers: [IntervalsController],
  providers: [IntervalsService],
})
export class IntervalsModule {}

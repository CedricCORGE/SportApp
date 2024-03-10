import { Interval } from 'src/intervals/entities/interval.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Interval, { eager: true })
  @JoinColumn()
  interval: Interval;
}

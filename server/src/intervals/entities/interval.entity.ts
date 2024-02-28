import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int', default: 1 })
  repetitions: number;

  @Column({ type: 'int', default: 30 })
  work: number;

  @Column({ type: 'int', default: 30 })
  rest: number;
}

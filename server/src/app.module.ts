import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { IntervalsModule } from './intervals/intervals.module';
import { Interval } from './intervals/entities/interval.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Interval],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    IntervalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

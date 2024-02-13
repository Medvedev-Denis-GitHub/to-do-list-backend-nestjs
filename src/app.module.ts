import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        database: config.get('POSTGRES_DB'),
        type: 'postgres',
        logging: false,
        synchronize: false,
        entities: [User, Company, Task, Project],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

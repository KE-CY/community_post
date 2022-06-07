import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostModule } from './module/post.module';
import { CommentModule } from './module/comment.module';
import { Comment } from './entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'swipper_test',
      password: 'swipper_test',
      database: 'community_post',
      autoLoadEntities: true,
      entities: [Post, Comment],
      synchronize: true,
    }),
    PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

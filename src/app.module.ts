/*
 * @Date: 2023-01-05 11:41:54
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-18 10:06:36
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.DB_URL), //ConfigModule 将.env文件中的键值对放入process.env中
    // 异步传递模块选项，而不是事先传递它们
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}

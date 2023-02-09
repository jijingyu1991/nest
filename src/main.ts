/*
 * @Date: 2023-01-05 11:41:54
 * @LastEditors: guantingting
 * @LastEditTime: 2023-01-12 15:40:01
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  //开启一个全局验证管道
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api'); //全局根路径
  await app.listen(9528);
}
bootstrap();

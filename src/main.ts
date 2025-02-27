import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 注册全局错误的过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局注册拦截器
    app.useGlobalInterceptors(new TransformInterceptor());

    // 设置swagger文档
    const config = new DocumentBuilder()
      .setTitle('管理后台')
      .setDescription('管理后台接口文档')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();

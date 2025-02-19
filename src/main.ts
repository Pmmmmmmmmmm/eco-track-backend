import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // 注册全局错误的过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局注册拦截器
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();

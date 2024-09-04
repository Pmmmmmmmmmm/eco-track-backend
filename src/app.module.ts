import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'ecoTrack',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动链接被 forFeature 注册的实体
      synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

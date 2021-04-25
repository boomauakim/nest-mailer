import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule,
    // Rate Limit : 10 Request/1 Minute (60 second)
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

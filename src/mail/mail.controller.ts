import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/sendMail';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  // Rate Limit : 5 Request/1 Hour (3600 second)
  @Throttle(5, 3600)
  @Post('/send')
  sendMail(@Body() body: SendMailDto) {
    return this.mailService.sendMail(body);
  }
}

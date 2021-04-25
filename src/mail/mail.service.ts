import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto/sendMail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(body: SendMailDto) {
    return await this.mailerService
      .sendMail({
        to: body.email,
        subject: 'Welcome',
        template: __dirname + '/templates/welcome',
        context: {
          name: body.name,
        },
      })
      .then(() => this.logger.log(`Sending email to ${body.email}`))
      .catch((error) => {
        this.logger.error(error.stack);
        throw new InternalServerErrorException();
      });
  }
}

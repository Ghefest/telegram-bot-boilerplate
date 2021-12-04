import axios from 'axios';
import { logger } from '../../common/utils/logger.mjs';
import { env } from '../../env.mjs';

export class LaunchBotService {
  bot;
  MODE = env.app.MODE;

  token = env.app.token;
  domain = env.app.domain ?? '';
  port = +env.app.port;

  loggerInfo = message => logger.info(`[${LaunchBotService.name}] ${message}`);
  loggerError = message => logger.error(`[${LaunchBotService.name}] ${message}`);

  constructor(bot) {
    this.bot = bot;
    this.bot = bot;
  }

  static initial(bot) {
    return new LaunchBotService(bot);
  }

  launch() {
    this.MODE === 'production' ? this.production() : this.development();
  }

  async production() {
    try {
      await this.bot.launch({
        webhook: {
          domain: this.domain,
          port: this.port,
        },
      });
      this.loggerInfo('bot running in production mode');
    } catch (error) {
      this.loggerError(error);
    }
  }

  async development() {
    try {
      await this.deleteWebhook();
      await this.bot.launch();
      this.loggerInfo('bot running in development mode');
    } catch (error) {
      this.loggerError(error);
    }
  }

  deleteWebhook() {
    return axios.get(`https://api.telegram.org/bot${this.token}/deleteWebhook`);
  }
}

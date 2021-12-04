import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { env } from './env.mjs';

import { Telegraf, session, Scenes } from 'telegraf';

import { I18n } from '@esindger/telegraf-i18n';

import { LaunchBotService } from './services/launch/launch-bot.service.mjs';
import { startSceneWizard } from './scenes/start/start.scene.mjs';

import { SCENES } from './common/enums/scenes/scenes-ids.enums.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bot = new Telegraf(env.app.token);

const stage = new Scenes.Stage([startSceneWizard]);
const i18n = new I18n({
  useSession: true,
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales'),
});

bot.use(session());
bot.use(i18n.middleware());
bot.use(stage.middleware());

bot.start(Scenes.Stage.enter(SCENES.START));

LaunchBotService.initial(bot).launch();

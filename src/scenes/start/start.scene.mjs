import { SCENES } from '../../common/enums/scenes/scenes-ids.enums.mjs';
import { Scenes } from 'telegraf';

// class StartScene {}

export const startSceneWizard = new Scenes.WizardScene(
  SCENES.START,

  ctx => {
    ctx.reply('What is ur name?');

    return ctx.wizard.next();
  },
  ctx => {
    const message = ctx.message.text;

    if (message) ctx.reply(message);
    return ctx.wizard.next();
  }
);

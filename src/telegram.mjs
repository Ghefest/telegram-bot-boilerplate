import { Telegram } from 'telegraf';
import { env } from './env.mjs';

export const telegram = new Telegram(env.app.token);

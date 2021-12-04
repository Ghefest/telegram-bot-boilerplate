import { getEnv } from './common/helpers/path.mjs';
import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: getEnv('PORT'),
    token: getEnv('TG_TOKEN'),
    domain: getEnv('DOMAIN'),
    MODE: getEnv('NODE_ENV'),
  },
};

export { env };

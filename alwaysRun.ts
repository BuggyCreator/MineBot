import { checkSaturation } from './task/checkSaturation';

export const alwaysRun = (bot) => {
  checkSaturation(bot);
};

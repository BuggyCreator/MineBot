export const checkSaturation = (bot) => {
  let currentSaturation = 0;
  try {
    currentSaturation = bot.food;
  } catch (error) {
    console.error(error);
  }

  const lowSaturationThreshold = bot.food / 2;

  if (currentSaturation <= lowSaturationThreshold) {
    bot.chat('お腹が空いたよ...');
  }
};

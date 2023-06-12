export const throwItem = (bot) => {
  const itemToToss = bot.inventory.items()[0];

  if (itemToToss) {
    bot.tossStack(itemToToss); // アイテムを捨てる
  }
};

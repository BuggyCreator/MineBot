export const eat = (bot) => {
  // 現在の空腹度を取得
  const currentSaturation = bot.food;

  // 空腹度が満タンでない場合の閾値
  const saturationThreshold = 20;

  // 空腹度が満タンでないかつインベントリ内に食べ物アイテムがある場合、それを食べる
  if (currentSaturation < saturationThreshold) {
    // インベントリ内の食べ物アイテムを探す
    const foodItem = bot.inventory.items().find((item) => item.name.includes('bread'));

    console.log(foodItem);
    // 食べ物アイテムが存在する場合、それを食べる
    if (foodItem) {
      const randomMessage = ['もぐもぐ', 'おいしい！'];
      bot.equip(foodItem, 'hand', (err) => {
        if (err) {
          console.error('アイテムの装備中にエラーが発生しました:', err);
          return;
        }
      });
      bot
        .consume(foodItem.type, foodItem.metadata, { timeout: 10000 })
        .then(() => {
          bot.chat(randomMessage[Math.floor(Math.random() * randomMessage.length)]);
        })
        .catch((error) => {
          console.error('アイテムの消費中にエラーが発生しました:', error);
        });
    } else {
      bot.chat('パンがないや');
    }
  } else {
    bot.chat('お腹いっぱい！');
  }
};

export const run = (bot) => {
  bot.setControlState('forward', true);
  bot.on('move', () => {
    const blockInFront = bot.blockAt(bot.entity.position.offset(0, 0, 1)); // 前方のブロックを取得
    if (blockInFront && blockInFront.type !== 0) {
      // ブロックがある場合
      bot.setControlState('jump', true); // ジャンプ開始
      setTimeout(() => {
        bot.setControlState('jump', false); // ジャンプ終了
      }, 500); // 0.5秒間ジャンプを続ける
    }
  });
  setTimeout(() => {
    bot.setControlState('forward', false);
  }, 3000);
};

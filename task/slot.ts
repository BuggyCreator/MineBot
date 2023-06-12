export const slot = (bot) => {
  const currentSlot = bot.quickBarSlot; // 現在のアイテムスロットのインデックス
  const newSlot = currentSlot + 1; // 移動先のアイテムスロットのインデックス

  bot.setQuickBarSlot(newSlot); // アイテムスロットを移動する
};

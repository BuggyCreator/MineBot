export const attack = (bot) => {
  const targetEntity = bot.nearestEntity(); // 攻撃したい対象のエンティティを取得
  if (targetEntity) {
    bot.attack(targetEntity); // エンティティを攻撃する
  }
};

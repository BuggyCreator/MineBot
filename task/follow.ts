const pathfinder = require('mineflayer-pathfinder');

export const follow = (bot, username) => {
  let intervalId;

  // プレイヤーの追尾を開始
  intervalId = setInterval(() => {
    const player = bot.nearestEntity(
      (entity) => entity.type === 'player' && entity.username === username
    );
    if (player) {
      const goal = new pathfinder.goals.GoalFollow(player, 1); // 追尾距離を指定
      bot.pathfinder.setGoal(goal);
    }
  }, 1000);

  // チャットメッセージが"stop"の場合、追尾を終了
  bot.on('chat', (sendername, message) => {
    if (sendername === username && message === 'stop') {
      clearInterval(intervalId);
      bot.pathfinder.setGoal(null); // 追尾を停止
    }
  });
};

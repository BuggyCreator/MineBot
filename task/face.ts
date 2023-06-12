export const face = (bot) => {
  const player = bot.nearestEntity((entity) => entity.type === 'player');
  if (player) {
    const dx = player.position.x - bot.entity.position.x;
    const dz = player.position.z - bot.entity.position.z;
    const targetYaw = Math.atan2(-dz, dx) * (180 / Math.PI);
    const targetPitch =
      Math.atan2(player.position.y - bot.entity.position.y, Math.sqrt(dx * dx + dz * dz)) *
      (180 / Math.PI);
    bot.look(targetYaw, targetPitch);
  }
};

import { privateChat } from './task/privateChat';

export const privateMessage = async (bot, chatHistory, username, message, CHAT_SETTINGS) => {
  if (message.startsWith('/code')) {
    const task = message.slice(5); // '/code'の部分を除去
    console.log(`Received task: ${task}`);
    bot.setControlState('forward', true);
    setTimeout(() => {
      bot.setControlState('forward', false);
    }, 3000); // 3秒間進んだ後に停止する
    // ここでChatGPT APIを使ってコード生成
  } else {
    privateChat(bot, chatHistory, username, message, CHAT_SETTINGS);
  }
};

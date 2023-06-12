import { doTask } from './doTask';

export const groupMessage = async (bot, chatHistory, username, chatContents, CHAT_SETTINGS) => {
  if (chatContents.substring(0, 4) !== 'bot,') return;
  const message = chatContents.substring(4);

  if (message.startsWith('/code')) {
    const task = message.slice(4); // '/code'の部分を除去
    // ここでChatGPT APIを使ってコード生成
  } else {
    doTask(bot, chatHistory, username, CHAT_SETTINGS, message);
  }
};

import { getResponseFromGPT } from '../getResponseFromGPT';
import fs from 'fs/promises';
import PROMPT from '../Prompts/chat';

export const groupChat = async (bot, chatHistory, username, message, CHAT_SETTINGS) => {
  // 新しいメッセージをチャット履歴に追加
  chatHistory.push(`${username}: ${message}`);

  const promptList: string[] = [];
  promptList.push(...chatHistory);
  promptList.push(PROMPT);
  const prompt = promptList.join('\n');
  const role = 'user';
  const reply = await getResponseFromGPT(
    role,
    prompt,
    CHAT_SETTINGS.TEMPERATURE,
    CHAT_SETTINGS.MAX_TOKENS
  );

  // ボットの返答をチャット履歴に追加
  chatHistory.push(`you: ${String(reply).replace(/\r?\n/g, '　　')}`);

  while (chatHistory.length > CHAT_SETTINGS.MAX_LINES) {
    chatHistory.shift();
  }

  bot.chat(reply);

  console.log('message:\n', message);
  console.log('reply:\n', reply);

  const filePath = `Data/groupChatData/groupChatHistory.txt`;

  const appendLine = async (filePath, line) => {
    try {
      await fs.appendFile(filePath, `\n${line}`);
    } catch (err) {
      console.error('Error appending file:', err);
    }
  };

  appendLine(filePath, `${username}: ${message}`);
  appendLine(filePath, `you: ${reply}`);
};

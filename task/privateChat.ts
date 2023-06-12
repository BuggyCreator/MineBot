import { getResponseFromGPT } from '../getResponseFromGPT';
import fs from 'fs/promises';
import PROMPT from '../Prompts/chat';

export const privateChat = async (bot, chatHistory, username, message, CHAT_SETTINGS) => {
  // 新しいメッセージをチャット履歴に追加
  if (!chatHistory.hasOwnProperty(username)) {
    chatHistory[username] = [];
  }
  chatHistory[username].push(`${username}: ${message}`);

  const promptList: string[] = [];
  promptList.push(...chatHistory[username]);
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
  chatHistory[username].push(`you: ${String(reply).replace(/\r?\n/g, '　　')}`);

  while (chatHistory[username].length > CHAT_SETTINGS.MAX_LINES) {
    chatHistory[username].shift();
  }

  const tellrawMessage = {
    text: `${reply}`,
    bold: true,
    color: 'white',
  };

  bot.chat(`/tellraw ${username} ${JSON.stringify(tellrawMessage)}`);

  console.log('message:\n', message);
  console.log('reply:\n', reply);

  const filePath = `Data/privateChatData/${username}.txt`;

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

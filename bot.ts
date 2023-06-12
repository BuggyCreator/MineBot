import { groupMessage } from './groupMessage';
import { privateMessage } from './privateMessage';
const mineflayer = require('mineflayer');
import readLastLines from 'read-last-lines';
import dotenv from 'dotenv';
import { checkSaturation } from './task/checkSaturation';
import { alwaysRun } from './alwaysRun';
const pathfinder = require('mineflayer-pathfinder');

dotenv.config();

const bot = mineflayer.createBot({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER_NAME,
  auth: 'microsoft',
  password: process.env.PASSWORD,
});
bot.loadPlugin(pathfinder.pathfinder);

const CHAT_SETTINGS = {
  MAX_TOKENS: 100,
  TEMPERATURE: 0.7,
  MAX_LINES: 10,
};
const USERS = ['RaiRai000'];

const readLines = async (filename, lineCount) => {
  try {
    let data = await readLastLines.read(filename, lineCount);
    data = data.endsWith('\n') ? data.slice(0, -1) : data;
    console.log('SUCCESS LOADING');
    return data.split('\n');
  } catch (err) {
    console.error(err);
    return;
  }
};

let groupChatHistory = [];

const LoadGroupChatData = async () => {
  groupChatHistory = await readLines('Data/groupChatData/groupChatHistory.txt', 10);
};

LoadGroupChatData();

const privateChatHistory = {};

const loadPrivateChatData = USERS.map(async (USER) => {
  privateChatHistory[USER] = await readLines(`Data/privateChatData/${USER}.txt`, 10);
});

Promise.all(loadPrivateChatData)
  .then()
  .catch((err) => console.error(err));

setInterval(() => {
  alwaysRun(bot);
}, 30000);

bot.on('message', async (jsonMsg, position) => {
  const json = jsonMsg.json;
  if (json.translate !== '<%s> %s' && json.translate !== '%s whispers to you: %s') return;
  const username = json.with[0].text;
  const message = json.with[1].text;

  if (username === bot.username) return;
  if (json.translate === '<%s> %s') {
    groupMessage(bot, groupChatHistory, username, message, CHAT_SETTINGS);
  }
  if (json.translate === '%s whispers to you: %s') {
    privateMessage(bot, privateChatHistory, username, message, CHAT_SETTINGS);
  }
  return;
});

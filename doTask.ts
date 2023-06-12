import { groupChat } from './task/groupChat';
import { run } from './task/run';
import { face } from './task/face';
import { attack } from './task/attack';
import { slot } from './task/slot';
import { throwItem } from './task/throw';
import { follow } from './task/follow';
import { eat } from './task/eat';

export const doTask = (bot, chatHistory, username, CHAT_SETTINGS, message) => {
  if (message.startsWith('/eat')) {
    eat(bot);
  } else if (message.startsWith('/run')) {
    run(bot);
  } else if (message.startsWith('/face')) {
    face(bot);
  } else if (message.startsWith('/attack')) {
    attack(bot);
  } else if (message.startsWith('/slot')) {
    slot(bot);
  } else if (message.startsWith('/throw')) {
    throwItem(bot);
  } else if (message.startsWith('/follow')) {
    follow(bot, username);
  } else {
    groupChat(bot, chatHistory, username, message, CHAT_SETTINGS);
  }
};

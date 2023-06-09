const telegramApi = require("node-telegram-bot-api");

const token = "6048666628:AAFG7v4mrZ56W5f2lhfgnXlJ0xgKDBATyLc";

const bot = new telegramApi(token, { polling: true });
bot.setMyCommands([
  { command: "/start", description: "Начальное приветсвие" },
  { command: "/info", description: "Узнать информацию о прользователе" },
  { command: "/game", description: "Сыграть в игру" },
]);

function start() {
  bot.on("message", async (msg) => {
    const chats = {};

    const gameOptions = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "1", callback_data: "1" },
            { text: "2", callback_data: "2" },
            { text: "3", callback_data: "3" },
          ],
          [
            { text: "4", callback_data: "4" },
            { text: "5", callback_data: "5" },
            { text: "6", callback_data: "6" },
          ],
          [
            { text: "7", callback_data: "7" },
            { text: "8", callback_data: "8" },
            { text: "9", callback_data: "9" },
          ],
          [{ text: "0", callback_data: "0" }],
        ],
      }),
    };

    if (text === "/start") {
      await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp");
      return bot.sendMessage(chatId, `Добро пожаловать в мой первый бот`);
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }
    if (text === "/game") {
      await bot.sendMessage(chatId, `Сейчас я загадаю число от 1 до 9, а ты должен будешь его угадать`);
      const randomNumber = Math.floor(Math.random() * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, `Отгадывай`, gameOptions);
    }

    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй ещё разок!`);
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === chats[chatId]) {
      return bot.sendMessage(chatId, `ты отгадал цифру ${chats[chatId]}`);
    } else {
      return bot.sendMessage(chatId, `К сожелению ты не угадал, бот загадал цифру ${chats[chatId]}`);
    }
  });
}

start();

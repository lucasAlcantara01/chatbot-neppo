const { showMenu } = require('./src/client/menu.js');

async function startBot() {
  console.log("Olá! 👋 Bem-vindo ao chatbot.");
  await showMenu();
}

startBot();

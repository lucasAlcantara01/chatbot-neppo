const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto) {
  return new Promise(resolve => {
    rl.question(texto, resposta => resolve(resposta.trim()));
  });
}

function fecharPrompt() {
  rl.close();
}

module.exports = { perguntar, fecharPrompt };

const { perguntar, fecharPrompt } = require('../utils/prompts.js');
const { consultarClima } = require('../services/consultarClima.js');
const { consultarCEP } = require('../services/consultarCEP.js');

async function showMenu() {
  while (true) {
    console.log("\nO que você deseja fazer?");
    console.log("[1] Consultar clima");
    console.log("[2] Consultar CEP");
    console.log("[3] Sair");

    const resposta = await perguntar("Escolha uma opção: ");

    switch (resposta) {
      case "1": {
        const cidade = await perguntar("Digite o nome da cidade: ");
        try {
          const resultado = await consultarClima(cidade);
          if (resultado.erro) {
            console.log(resultado.mensagem);
          } else {
            console.log(`\nTemperatura atual em ${cidade}: ${resultado.temperatura}°C`);
          }
        } catch (error) {
          console.error("Erro ao consultar o clima:", error.message);
        }
        break;
      }
      case "2": {
        const cep = await perguntar("Digite o CEP (apenas números): ");
        try {
          const resultado = await consultarCEP(cep);
          if (resultado.erro) {
            console.log(resultado.mensagem);
          } else {
            console.log(`\nResultado para o CEP ${cep}:`);
            console.log(`${resultado.logradouro}, ${resultado.bairro}`);
            console.log(`${resultado.localidade} - ${resultado.uf}`);
          }
        } catch (error) {
          console.error("Erro ao consultar o CEP:", error.message);
        }
        break;
      }
      case "3":
        console.log("Até logo!");
        fecharPrompt();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

module.exports = { showMenu };

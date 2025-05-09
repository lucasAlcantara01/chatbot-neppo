const { consultarClima } = require('../services/consultarClima.js');
const { consultarCEP } = require('../services/consultarCEP.js');
const rl = require('readline-sync');

async function showMenu() {
  while (true) {
    console.log('-'.repeat(40));
    console.log("\nO que você deseja fazer?");
    console.log("[1] Consultar clima");
    console.log("[2] Consultar CEP");
    console.log("[3] Sair");

    const estado = rl.question('Escolher uma opcao:  ');

    switch (estado) {
      case "1": {
        const cidade = rl.question('Digite o nome da cidade:  ');
        try {
          const clima = await consultarClima(cidade);
          if (clima.erro) {
            console.log(clima.mensagem);
          } else {
            console.log(`\nTemperatura atual em ${cidade}: ${clima.temperatura}°C`);
          }
        } catch (error) {
          console.error("Erro ao consultar o clima:", error.message);
        }
        break;
      }
      case "2": {
        const cep = rl.question('Digite o CEP (apenas numeros)  ');
        try {
          const endereco = await consultarCEP(cep);
          if (endereco.erro) {
            console.log(endereco.mensagem);
          } else {
            console.log(`\nResultado para o CEP ${cep}:`);
            console.log(`${endereco.logradouro}, ${endereco.bairro}`);
            console.log(`${endereco.localidade} - ${endereco.uf}`);
          }
        } catch (error) {
          console.error("Erro ao consultar o CEP:", error.message);
        }
        break;
      }
      case "3":
        console.log("Até logo!");
        console.log('-'.repeat(40));
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

module.exports = { showMenu };

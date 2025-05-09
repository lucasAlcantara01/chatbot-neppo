async function consultarCEP(cep) {
  if (!/^\d{8}$/.test(cep)) {
    return { erro: true, mensagem: "CEP inválido. Use 8 números." };
  }

  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await resposta.json();

  if (dados.erro) {
    return { erro: true, mensagem: "CEP não encontrado." };
  }

  return {
    logradouro: dados.logradouro,
    bairro: dados.bairro,
    localidade: dados.localidade,
    uf: dados.uf
  };
}

module.exports = { consultarCEP };

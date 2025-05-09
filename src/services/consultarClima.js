async function consultarClima(cidade) {
  const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cidade)}`);
  const geoData = await geoRes.json();

  if (!geoData.length) {
    return { erro: true, mensagem: "Cidade não encontrada." };
  }

  const { lat, lon } = geoData[0];
  const climaRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  const climaData = await climaRes.json();

  return {
    temperatura: climaData.current_weather.temperature,
    cidade
  };
}

module.exports = { consultarClima };
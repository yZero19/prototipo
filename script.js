async function consultarCep(cepId, logradouroId, bairroId) {
  const cepInput = document.getElementById(cepId);
  const logradouroInput = document.getElementById(logradouroId);
  const bairroInput = document.getElementById(bairroId);
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }

      const data = await response.json();
      console.log('Dados do CEP:', data);

      if (data.erro) {
        alert('CEP não encontrado');
        logradouroInput.value = '';
        bairroInput.value = '';
      } else {
        logradouroInput.value = data.logradouro;
        bairroInput.value = data.bairro;
      }
    } catch (error) {
      console.error('Erro ao consultar o CEP:', error);
      alert('Erro ao consultar o CEP');
    }
  } else {
    logradouroInput.value = '';
    bairroInput.value = '';
  }
}

document.getElementById('cepEmissao').addEventListener('blur', () => {
  consultarCep('cepEmissao', 'logradouroEmissao', 'bairroEmissao');
});

document.getElementById('cepEntrega').addEventListener('blur', () => {
  consultarCep('cepEntrega', 'logradouroEntrega', 'bairroEntrega');
});

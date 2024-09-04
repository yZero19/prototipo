
async function consultarCep() {
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('endereco');
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
          enderecoInput.value = '';
        } else {
          enderecoInput.value = `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`;
        }
      } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        alert('Erro ao consultar o CEP');
      }
    } else {
      enderecoInput.value = '';
    }
  }
  

  document.getElementById('cep').addEventListener('blur', consultarCep);
  
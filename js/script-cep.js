const ding = new Audio("sound/click_effect-86995.mp3");

document.getElementById('pesquisar').addEventListener('click', function() {
    ding.play();
    const nome = document.getElementById('input-nome').value.trim();
    const cepOriginal = document.getElementById('input-cep').value.trim();
    const cep = cepOriginal.replace(/\D/g, ''); 

        // Validação do nome
    if (nome === '') {
        alert('Por favor, preencha o nome.');
        return;
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
        alert('O nome deve conter apenas letras.');
        return;
    }

    // Validação do CEP (campo obrigatório, se é número e se tem 8 dígitos)
    if (cepOriginal === '') {
        alert('Por favor, preencha o CEP.');
        return;
    }

    if (!/^\d+$/.test(cepOriginal)) {
        alert('O CEP deve conter apenas números.');
        return;
    }

    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 números.');
        return;
    }


    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert('CEP não encontrado!');
            return;
        }

        // Preencher os campos com os dados recebidos
        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        document.getElementById('pais').value = 'Brasil';

        // Limpa complemento e número, porque esses não vêm da API
        document.getElementById('complemento').value = '';
        document.getElementById('numero').value = '';

    })
    .catch(() => {
        alert('Erro ao consultar o CEP. Tente novamente.');
    });
});

// Limpa formulário
document.getElementById('limparcontato').addEventListener('click', function() {
    ding.play();
    document.getElementById('formulario').reset();
});
let indiceEdicao = null;

function loadLogradouro() {
    var cep = document.getElementById('cep').value

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.')
                return;
            }
            document.getElementById('rua').value = data.logradouro
            document.getElementById('bairro').value = data.bairro
            document.getElementById('cidade-uf').value = `${data.localidade} / ${data.uf}`
        })
}

function registrarCadastro(event) {
    event.preventDefault()

    const novoCadastro = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        fone: document.getElementById('fone'),
        cep: document.getElementById('cep'),
        rua: document.getElementById('rua'),
        bairro: document.getElementById('bairro'),
        cidadeUf: document.getElementById('cidade-uf'),
        senha: document.getElementById('senha')
    }
    
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    cadastros.push(cadastro)

    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    alert("Cadastro realizado com sucesso!")

    event.target.reset();
}

function editarCadastro(event) {
    event.preventDefault();

    if (typeof indiceEdicao !== "number") {
        alert("Nenhum cadastro selecionado para edição.");
        return;
    }

    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    if (indiceEdicao < 0 || indiceEdicao >= cadastros.length) {
        alert("Erro: Índice de edição inválido.");
        return;
    }

    const cadastroAtualizado = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        fone: document.getElementById('fone').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidadeUf: document.getElementById('cidade-uf').value.trim()
    };

    cadastros[indiceEdicao] = cadastroAtualizado;
    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    alert("Cadastro atualizado com sucesso!");

    carregarCadastros();
    document.getElementById("cadastro-edicao-Form").reset();

    indiceEdicao = null;
}

function carregarCadastros() {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    let tabela = document.getElementById('tabela-cadastros');
    tabela.innerHTML = cadastros.map((c, i) =>
        `<tr>
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.fone}</td>
            <td>${c.cep}</td>
            <td>${c.rua}</td>
            <td>${c.bairro}</td>
            <td>${c.cidadeUf}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="prepararEdicao(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirCadastro(${i})">Excluir</button>
            </td>
        </tr>`).join('')
}

function prepararEdicao(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    document.getElementById('nome').value = cadastros[index].nome
    document.getElementById('email').value = cadastros[index].email
    document.getElementById('fone').value = cadastros[index].fone
    document.getElementById('cep').value = cadastros[index].cep
    document.getElementById('rua').value = cadastros[index].rua
    document.getElementById('bairro').value = cadastros[index].bairro
    document.getElementById('cidade-uf').value = cadastros[index].cidadeUf
}

function excluirCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    cadastros.splice(index, 1);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    carregarCadastros();
}

carregarCadastros()

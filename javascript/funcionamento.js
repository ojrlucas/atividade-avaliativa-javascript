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
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        fone: document.getElementById('fone').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidadeUf: document.getElementById('cidade-uf').value,
        senha: document.getElementById('senha').value
    }
    
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    cadastros.push(novoCadastro)

    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    alert("Cadastro realizado com sucesso!")

    event.target.reset()
}

function carregarCadastros() {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    let tabela = document.getElementById('tabela-cadastros')
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
                <button class="btn btn-warning btn-sm" onclick="excluirCadastro(${i})">Excluir</button>
            </td>
        </tr>`).join('')
}

function prepararEdicao(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    document.getElementById('cadastro-edicao-Form').style.display = 'block'


    if (index < 0 || index >= cadastros.length) {
        alert("Erro: Cadastro não encontrado!")
        return
    }

    indiceEdicao = index; 

    document.getElementById('nome').value = cadastros[index].nome
    document.getElementById('email').value = cadastros[index].email
    document.getElementById('fone').value = cadastros[index].fone
    document.getElementById('cep').value = cadastros[index].cep
    document.getElementById('rua').value = cadastros[index].rua
    document.getElementById('bairro').value = cadastros[index].bairro
    document.getElementById('cidade-uf').value = cadastros[index].cidadeUf
}

function editarCadastro(event) {
    event.preventDefault()

    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []

    if (indiceEdicao === null || indiceEdicao < 0 || indiceEdicao >= cadastros.length) {
        alert("Erro: Nenhum cadastro selecionado para edição!")
        return
    }

    const cadastroAtualizado = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        fone: document.getElementById('fone').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidadeUf: document.getElementById('cidade-uf').value.trim()
    }

    cadastros[indiceEdicao] = cadastroAtualizado;
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
    carregarCadastros()
    alert("Cadastro atualizado com sucesso!");

    document.getElementById("cadastro-edicao-Form").reset();
    document.getElementById('cadastro-edicao-Form').style.display = 'none'
    indiceEdicao = null
}

function excluirCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || []
    cadastros.splice(index, 1)
    localStorage.setItem('cadastros', JSON.stringify(cadastros))
    carregarCadastros()
}

carregarCadastros()

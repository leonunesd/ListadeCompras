// Função para carregar produtos do localStorage
function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (produtos.length === 0) {
        const produtosPreCadastrados = [
            { produto: 'Missil interbalistico', descricao: '27 quanzas', imagemUrl: 'https://media1.tenor.com/m/VwcbzlQ2N14AAAAC/gmail-dog.gif' },
            { produto: 'Madeira', descricao: '8', imagemUrl: 'https://img.freepik.com/fotos-premium/pedra-flutuante-em-fundo-branco_241146-1121.jpg?w=1060' },
            { produto: 'cabo de rede', descricao: 'esqueci', imagemUrl: 'https://imgs.casasbahia.com.br/1504081990/1xg.jpg?imwidth=384' }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtosPreCadastrados));
    }

    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';

    const produtosAtualizados = JSON.parse(localStorage.getItem('produtos'));
    produtosAtualizados.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const img = document.createElement('img');
        img.src = item.imagemUrl;
        img.alt = item.produto;
        img.className = 'produto-img';

        li.appendChild(img);

        const textoProduto = document.createElement('span');
        textoProduto.textContent = item.produto + ' - ' + item.descricao; // Mostra a descrição junto
        li.appendChild(textoProduto);

        // Botão de editar nome
        if (index < 3) {
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar Nome';
            btnEditar.className = 'btn btn-custom btn-sm ml-2'; // Alterado para fundo branco
            btnEditar.onclick = () => editarProduto(index);
            li.appendChild(btnEditar);
        }

        // Botão de editar descrição
        const btnEditarDescricao = document.createElement('button');
        btnEditarDescricao.textContent = 'Editar Descrição';
        btnEditarDescricao.className = 'btn btn-custom btn-sm ml-2'; // Alterado para fundo branco
        btnEditarDescricao.onclick = () => editarDescricao(index);
        li.appendChild(btnEditarDescricao);

        // Botão de mudar imagem
        const btnMudarImagem = document.createElement('button');
        btnMudarImagem.textContent = 'Mudar Imagem';
        btnMudarImagem.className = 'btn btn-custom btn-sm ml-2'; // Alterado para fundo branco
        btnMudarImagem.onclick = () => mudarImagem(index);
        li.appendChild(btnMudarImagem);

        // Adiciona o botão de remover apenas para produtos não iniciais
        if (index >= 3) {
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.className = 'btn btn-danger btn-sm';
            btnRemover.onclick = () => removerProduto(index);
            li.appendChild(btnRemover);
        }

        lista.appendChild(li);
    });
}

// Função para adicionar produto ao localStorage
function adicionarProduto() {
    const produtoInput = document.getElementById('produto');
    const descricaoInput = document.getElementById('descricao');
    const imagemUrlInput = document.getElementById('imagem-url');
    const produto = produtoInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const imagemUrl = imagemUrlInput.value.trim();

    if (produto && descricao && imagemUrl) {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push({ produto, descricao, imagemUrl });
        localStorage.setItem('produtos', JSON.stringify(produtos));
        produtoInput.value = '';
        descricaoInput.value = '';
        imagemUrlInput.value = '';
        carregarProdutos();
    }
}

// Função para remover produto do localStorage
function removerProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
}

// Função para editar o nome do produto
function editarProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novoNome = prompt('Digite o novo nome para ' + produtos[index].produto, produtos[index].produto);

    if (novoNome !== null && novoNome.trim() !== '') {
        produtos[index].produto = novoNome.trim();
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarProdutos();
    }
}

// Função para editar a descrição do produto
function editarDescricao(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novaDescricao = prompt('Digite a nova descrição para ' + produtos[index].produto, produtos[index].descricao);

    if (novaDescricao !== null && novaDescricao.trim() !== '') {
        produtos[index].descricao = novaDescricao.trim();
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarProdutos();
    }
}

// Função para mudar a imagem do produto
function mudarImagem(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novaImagemUrl = prompt('Digite a nova URL da imagem para ' + produtos[index].produto, produtos[index].imagemUrl);

    if (novaImagemUrl !== null && novaImagemUrl.trim() !== '') {
        produtos[index].imagemUrl = novaImagemUrl.trim();
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarProdutos();
    }
}

// Função para reiniciar a lista
function reiniciarLista() {
    localStorage.removeItem('produtos');
    carregarProdutos();
}

// Adiciona eventos aos botões
document.getElementById('adicionar').addEventListener('click', adicionarProduto);
document.getElementById('reiniciar-lista').addEventListener('click', reiniciarLista);

// Carrega os produtos ao iniciar a página
window.onload = carregarProdutos;

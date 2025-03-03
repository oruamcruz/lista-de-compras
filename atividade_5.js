
// Inicializa a lista de compras com categorias pré-definidas
let listaDeCompras = {
    'Bebidas': [],
    'Cereais': [],
    'Congelados': [],
    'Doces': [],
    'Frutas': [],
    'Laticínios': [],
    'Material de limpeza': [],
    'Padaria': [],
    'Verduras': [],
    'Outros': []
};

// Elementos DOM
const itemNameInput = document.getElementById('item-name');
const categorySelect = document.getElementById('category');
const addButton = document.getElementById('add-btn');
const finishButton = document.getElementById('finish-btn');
const clearButton = document.getElementById('clear-btn');
const shoppingListDiv = document.getElementById('shopping-list');
const emptyListDiv = document.getElementById('empty-list');
const successMessage = document.getElementById('success-message');
const removeButton = document.getElementById('remove-btn');


// Função para adicionar um item à lista de compras
function adicionarItem() {
    const itemName = itemNameInput.value.trim();
    const category = categorySelect.value;

    if (itemName === '') {
        alert('Por favor, digite o nome do item.');
        return;
    }

    // Adiciona o item à categoria selecionada
    listaDeCompras[category].push(itemName);

    // Limpa o campo de entrada
    itemNameInput.value = '';
    itemNameInput.focus();

    // Mostra mensagem de sucesso
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);

    // Atualiza a lista de compras
    atualizarListaDeCompras();
}

//Função para remover item da lista
// Função para remover um item da lista de compras
function removerItem() {
    // Verifica se a lista está vazia
    let listaVazia = true;
    for (const categoria in listaDeCompras) {
        if (listaDeCompras[categoria].length > 0) {
            listaVazia = false;
            break;
        }
    }

    if (listaVazia) {
        alert('Não há itens para remover na lista de compras!');
        return;
    }

    // Cria uma lista de todos os itens e suas categorias
    let todosItens = [];
    for (const categoria in listaDeCompras) {
        listaDeCompras[categoria].forEach(item => {
            todosItens.push({ nome: item, categoria: categoria });
        });
    }

    // Se não há itens, não há o que remover
    if (todosItens.length === 0) {
        alert('Não há itens para remover na lista de compras!');
        return;
    }

    // Exibe todos os itens da lista para o usuário
    let mensagem = "Itens na lista de compras:\n";
    for (let i = 0; i < todosItens.length; i++) {
        mensagem += `${i + 1}. ${todosItens[i].nome} (${todosItens[i].categoria})\n`;
    }
    mensagem += "\nDigite o número do item que deseja remover:";

    // Solicita ao usuário que escolha o item a ser removido
    const escolha = prompt(mensagem);

    // Verifica se o usuário cancelou ou inseriu um valor não numérico
    if (escolha === null || escolha.trim() === '' || isNaN(escolha)) {
        alert('Operação cancelada ou entrada inválida.');
        return;
    }

    const indice = parseInt(escolha) - 1;

    // Verifica se o índice é válido
    if (indice < 0 || indice >= todosItens.length) {
        alert('Não foi possível encontrar o item dentro da lista!');
        return;
    }

    // Remove o item da lista
    const itemRemovido = todosItens[indice];
    const index = listaDeCompras[itemRemovido.categoria].indexOf(itemRemovido.nome);

    if (index !== -1) {
        listaDeCompras[itemRemovido.categoria].splice(index, 1);
        alert(`O item "${itemRemovido.nome}" foi removido da lista de compras!`);

        // Atualiza a exibição da lista
        atualizarListaDeCompras();
    } else {
        alert('Não foi possível encontrar o item dentro da lista!');
    }
}

// Função para limpar a lista de compras
function limparLista() {
    // Confirma se o usuário realmente quer limpar a lista
    const confirmacao = confirm('Tem certeza que deseja limpar toda a lista de compras?');

    if (confirmacao) {
        // Reinicializa o objeto da lista de compras
        listaDeCompras = {
            'Bebidas': [],
            'Cereais': [],
            'Congelados': [],
            'Doces': [],
            'Frutas': [],
            'Laticínios': [],
            'Material de limpeza': [],
            'Padaria': [],
            'Verduras': [],
            'Outros': []
        };

        // Adicione esta linha para resetar a seleção para "Bebidas"
        categorySelect.value = 'Bebidas';

        // Atualiza a exibição
        atualizarListaDeCompras();

        // Mostra mensagem
        alert('Lista de compras foi limpa com sucesso!');
    }
}


// Função para atualizar a exibição da lista de compras
function atualizarListaDeCompras() {
    // Limpa o conteúdo atual
    shoppingListDiv.innerHTML = '';

    // Verifica se a lista está vazia
    let listaVazia = true;
    for (const categoria in listaDeCompras) {
        if (listaDeCompras[categoria].length > 0) {
            listaVazia = false;
            break;
        }
    }

    // Habilita ou desabilita o botão Limpar baseado no estado da lista
    if (listaVazia) {
        clearButton.disabled = true;
        clearButton.style.opacity = '0.5';
        clearButton.style.cursor = 'not-allowed';
        shoppingListDiv.appendChild(emptyListDiv);
    } else {
        clearButton.disabled = false;
        clearButton.style.opacity = '1';
        clearButton.style.cursor = 'pointer';

        // Remove a mensagem de lista vazia
        if (emptyListDiv.parentNode === shoppingListDiv) {
            shoppingListDiv.removeChild(emptyListDiv);
        }

        // Adiciona cada categoria com seus itens
        for (const categoria in listaDeCompras) {
            const itens = listaDeCompras[categoria];

            if (itens.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category';

                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = categoria;
                categoryDiv.appendChild(categoryTitle);

                const itemList = document.createElement('ul');
                itens.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    itemList.appendChild(listItem);
                });

                categoryDiv.appendChild(itemList);
                shoppingListDiv.appendChild(categoryDiv);
            }
        }
    }

    function atualizarBotaoRemover() {
        const removeButton = document.getElementById('remove-btn');

        // Verifica se a lista está vazia
        let listaVazia = true;
        for (const categoria in listaDeCompras) {
            if (listaDeCompras[categoria].length > 0) {
                listaVazia = false;
                break;
            }
        }

        // Habilita ou desabilita o botão Remover baseado no estado da lista
        if (listaVazia) {
            removeButton.disabled = true;
            removeButton.style.opacity = '0.5';
            removeButton.style.cursor = 'not-allowed';
        } else {
            removeButton.disabled = false;
            removeButton.style.opacity = '1';
            removeButton.style.cursor = 'pointer';
        }
    }

}

// Event listeners
addButton.addEventListener('click', adicionarItem);

removeButton.addEventListener('click', removerItem);

itemNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarItem();
    }
});

finishButton.addEventListener('click', function () {
    let listaVazia = true;
    for (const categoria in listaDeCompras) {
        if (listaDeCompras[categoria].length > 0) {
            listaVazia = false;
            break;
        }
    }

    if (listaVazia) {
        alert('Sua lista de compras está vazia!');
    } else {
        // Formata a lista para exibir no alerta
        let mensagem = "Lista de compras:\n";
        for (const categoria in listaDeCompras) {
            const itens = listaDeCompras[categoria];
            if (itens.length > 0) {
                mensagem += `    ${categoria}: ${itens.join(', ')}\n`;
            }
        }
        alert(mensagem);
    }
});

// Verifica o estado do botão Limpar na inicialização
if (emptyListDiv.parentNode === shoppingListDiv) {
    clearButton.disabled = true;
    clearButton.style.opacity = '0.5';
    clearButton.style.cursor = 'not-allowed';
}

//botão para limpar toda a lista
clearButton.addEventListener('click', limparLista);

// Inicializa a lista
atualizarListaDeCompras();

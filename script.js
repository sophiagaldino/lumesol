// Função para adicionar um produto ao carrinho
function adicionarCarrinho(nomeProduto, precoProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ nome: nomeProduto, preco: precoProduto });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para exibir os produtos no carrinho com opção de remover
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = ""; // Limpa a lista antes de renderizar novamente

    carrinho.forEach((produto, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${produto.nome} - R$ ${produto.preco} 
            <button onclick="removerDoCarrinho(${index})" class="btn-remover">Remover</button>
        `;
        listaCarrinho.appendChild(li);
    });
}

// Função para remover um produto específico do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o produto do índice especificado
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza a lista do carrinho
}

// Função para finalizar a compra e redirecionar para o WhatsApp
function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    let produtos = carrinho.map(produto => `${produto.nome} - R$ ${produto.preco}`).join('%0A');
    let mensagem = `Olá, gostaria de comprar:%0A${produtos}`;
    let linkWhatsApp = `https://wa.me/558197771883?text=${encodeURIComponent(mensagem)}`;
    window.location.href = linkWhatsApp;
}

// Chama a função para exibir o carrinho na página do carrinho
if (document.getElementById('lista-carrinho')) {
    exibirCarrinho();
}


function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message; // Define a mensagem a ser exibida
    notification.classList.add("show");
    notification.classList.remove("hidden");

    // Ocultar a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
        notification.classList.add("hidden");
    }, 3000);
}

// Exemplo de como chamar a função ao adicionar um item no carrinho
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        showNotification("Produto adicionado ao carrinho!");
    });
});


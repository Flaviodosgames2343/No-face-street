 const abrirCarrinho = document.getElementById("abrirCarrinho");
    const carrinho = document.getElementById("carrinho");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const botoesComprar = document.querySelectorAll(".addCarrinho");
    const sairCarrinho = document.getElementById("sairCarrinho");
    const cartCount = document.getElementById("cartCount");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");

    let itensCarrinho = [];

    function atualizarCarrinho() {
      listaCarrinho.innerHTML = "";
      let total = 0;

      itensCarrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrinho");

        let precoNum = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        total += precoNum * item.qtd;

        div.innerHTML = `
          <span>${item.nome} - R$ ${precoNum.toFixed(2).replace(".", ",")}</span>
          <div>
            <button class="qtd-btn" onclick="alterarQtd(${index}, -1)">-</button>
            ${item.qtd}
            <button class="qtd-btn" onclick="alterarQtd(${index}, 1)">+</button>
            <button class="remover" onclick="removerItem(${index})">X</button>
          </div>
        `;
        listaCarrinho.appendChild(div);
      });

      totalCarrinho.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
      cartCount.textContent = itensCarrinho.reduce((sum, i) => sum + i.qtd, 0);
    }

    function removerItem(index) {
      itensCarrinho.splice(index, 1);
      atualizarCarrinho();
    }

    function alterarQtd(index, delta) {
      itensCarrinho[index].qtd += delta;
      if (itensCarrinho[index].qtd <= 0) {
        removerItem(index);
      } else {
        atualizarCarrinho();
      }
    }

    botoesComprar.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        e.preventDefault();
        const card = e.target.closest(".card");
        const nome = card.querySelector("h3").textContent;
        const preco = card.querySelector("p").textContent;

        let itemExistente = itensCarrinho.find(i => i.nome === nome);
        if (itemExistente) {
          itemExistente.qtd++;
        } else {
          itensCarrinho.push({ nome, preco, qtd: 1 });
        }

        atualizarCarrinho();
        carrinho.classList.add("ativo");
      });
    });

    abrirCarrinho.addEventListener("click", () => {
      carrinho.classList.toggle("ativo");
    });

    sairCarrinho.addEventListener("click", () => {
      carrinho.classList.remove("ativo");
    });

    // Botão Finalizar Compra
    finalizarCompra.addEventListener("click", () => {
      if (itensCarrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      let mensagem = "Olá! Gostaria de finalizar a compra:\n\n";
      let total = 0;

      itensCarrinho.forEach(item => {
        let precoNum = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        total += precoNum * item.qtd;
        mensagem += `• ${item.nome} (x${item.qtd}) - R$ ${precoNum.toFixed(2).replace(".", ",")}\n`;
      });

      mensagem += `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

      let telefone = "5516997033586"; // WhatsApp
      let url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    });

    window.removerItem = removerItem;
    window.alterarQtd = alterarQtd;
    const menuDropdown = document.getElementById("menuDropdown");

// Abre/fecha dropdown
abrirMenu.onclick = () => {
  menuDropdown.classList.toggle("ativo");
};

// Fecha dropdown ao clicar fora
document.addEventListener("click", (e) => {
  if (!abrirMenu.contains(e.target) && !menuDropdown.contains(e.target)) {
    menuDropdown.classList.remove("ativo");
  }
});

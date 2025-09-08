const sairCarrinho = document.getElementById("sairCarrinho");

sairCarrinho.addEventListener("click", () => {
  carrinho.classList.remove("ativo");
});
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

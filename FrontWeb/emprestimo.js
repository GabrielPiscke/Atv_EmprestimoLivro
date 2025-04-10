  function cadastrar(){
    const formData = {
      nome: String(document.getElementById('nome').value),
      valor: Number(document.getElementById('valor').value),
      saldo: Number(document.getElementById('saldo').value),
      saldominimo: Number(document.getElementById('saldominimo').value)
    };

    fetch('http://localhost:8080/produto', {

      method: 'POST', // Especifica o método como POST
      headers: {
        'Content-Type': 'application/json', // Define que o corpo da requisição será em formato JSON
      },
      body: JSON.stringify(formData) // Dados que você deseja enviar no corpo da requisição
    
    })

    .then(response => {
      if (!response.ok) { // Verifica se a resposta foi bem-sucedida
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {alert("Produto cadastrado com sucesso!");
    document.getElementById("formProduto").reset(); // Limpa o formulário
    carregar(); // Atualiza a lista automaticamente
    })
    .catch(error => console.error('Erro:', error)); // Trata qualquer erro
  }
  
  function carregar(){
    fetch("http://localhost:8080/produto")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        return response.json();
    })
    .then(data => {
        let lista = document.getElementById("saida");
        lista.innerHTML = ""; // Limpa a lista antes de exibir

        data.forEach(produto => {
            let item = document.createElement("li");
            item.textContent = `${produto.id} - ${produto.nome} - R$ ${produto.valor.toFixed(2)} - Saldo: ${produto.saldo} - Saldo Minimo: ${produto.saldominimo} - `;
            
            // Criar o botão de deletar
            let botaoDeletar = document.createElement("button");
            botaoDeletar.textContent = "Deletar";

            botaoDeletar.onclick = function() {
              deletarProduto(produto.id); // Chama a função deletarProduto com o id do produto
            };

            // Adicionar o botão ao item da lista
            item.appendChild(botaoDeletar);

            lista.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao buscar produtos. Verifique o console.");
    });
  }

    function deletarProduto(produtoId) {
    // A URL do endpoint para deletar o produto, usando o ID
    const url = `http://localhost:8080/produto/${produtoId}`;
    console.log(url);

    fetch(url, {
        method: 'DELETE', // Método HTTP para deletar
        headers: {
            'Content-Type':'application/json'
            // Adicione outros cabeçalhos, como um token de autenticação se necessário
            // 'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar o produto!');
        }
        let lista = document.getElementById("saida");
        lista.innerHTML = "";
        alert('Produto deletado com sucesso:');
    })
    .catch(error => {
        console.error('Erro:', error);
        // Adicione lógica para lidar com erros, como exibir uma mensagem ao usuário
    });
    carregar();
    }

    

  function configurar() {
    let carregarProdutoBtn = document.getElementById('carregarProdutoBtn');
    let cadastrarProdutoBtn = document.getElementById('cadastrarProdutoBtn');
   
    //prettier-ignore
    if ((carregarProdutoBtn instanceof HTMLButtonElement)
     && (cadastrarProdutoBtn instanceof HTMLButtonElement)) {

      cadastrarProdutoBtn.addEventListener('click', () => {
          cadastrar();
      });
  
      carregarProdutoBtn.addEventListener('click', () => {
        carregar();
      });

    }
  }
  
  document.addEventListener('DOMContentLoaded', configurar);

  //GUGUG

 /*  document.getElementById("produtoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const produto = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value), // <-- Aqui estava faltando a vírgula!
        quantidade: parseInt(document.getElementById("quantidade").value) // Agora está correto!
    };

    fetch("http://localhost:8080/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(JSON.stringify(err)); });
        }
        return response.json();
    })     
    .then(data => {
        alert("Produto cadastrado com sucesso!");
        document.getElementById("produtoForm").reset(); // Limpa o formulário
        buscarProdutos(); // Atualiza a lista automaticamente
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Falha ao cadastrar o produto. Verifique o console.");
    });
});

function buscarProdutos() {
    fetch("http://localhost:8080/produto")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        return response.json();
    })
    .then(data => {
        const lista = document.getElementById("listaProdutos");
        lista.innerHTML = ""; // Limpa a lista antes de exibir

        data.forEach(produto => {
            const item = document.createElement("li");
            item.textContent = `${produto.id} - ${produto.nome} - R$ ${produto.preco.toFixed(2)} - Quantidade: ${produto.quantidade}`;
            lista.appendChild(item);
        });
    })
BOTARAM NO CASSA
    .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao buscar produtos. Verifique o console.");
    });



} */


 
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
                item.textContent = `${produto.id} - ${produto.nome} - R$ ${produto.valor.toFixed(2)} - Saldo: ${produto.saldo} - Saldo Minimo: ${produto.saldominimo}`;
                
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
    let lista = document.getElementById("saida");
    lista.innerHTML = ""; 
    carregar();
    }

    function atualizar(){
       let id = getIdFromUrl();
       console.log(id)
         const dados = {
            nome: String(document.getElementById('nome').value),
            valor: Number(document.getElementById('valor').value),
            saldo: Number(document.getElementById('saldo').value),
            saldominimo: Number(document.getElementById('saldominimo').value)
        }
        fetch(`http://localhost:8080/produto/${id}`, {
            method: 'PUT', // Usando o método PUT
            headers: {
                'Content-Type': 'application/json', // Define que os dados são JSON
            },
            body: JSON.stringify(dados) // Envia os dados em formato JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o produto!');
            }
            return response.json(); // Resposta em JSON
        })
        .then(data => {
            console.log('Produto atualizado com sucesso:', data);
            alert('Produto atualizado com sucesso!');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao atualizar produto');
        });
        carregar();
    }
    function getIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id'); // Retorna o valor do parâmetro "id"
        return id;
    }
    function preencherFormulario() {
        const idProduto = getIdFromUrl(); // Pega o ID da URL

        if (!idProduto) {
            console.error("ID não encontrado na URL");
            return;
        }

        // Requisição para buscar os dados do produto com o ID
        fetch(`http://localhost:8080/produto/${idProduto}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados do produto');
                }
                return response.json();
            })
            .then(data => {
                // Preencher os campos do formulário com os dados recebidos
                document.getElementById('nome').value = data.nome || '';
                document.getElementById('valor').value = data.valor || '';
                document.getElementById('saldo').value = data.saldo || '';
                document.getElementById('saldominimo').value = data.saldominimo || '';
            })
            .catch(error => {
                console.error('Erro ao preencher o formulário:', error);
            });
    }

    function configurar() {
        preencherFormulario();
        let carregarProdutoBtn = document.getElementById('carregarProdutoBtn');
        let atualizarProdutoBtn = document.getElementById('atualizarProdutoBtn');
    
        //prettier-ignore
        if ((carregarProdutoBtn instanceof HTMLButtonElement) && 
        (atualizarProdutoBtn instanceof HTMLButtonElement)) {
    
        carregarProdutoBtn.addEventListener('click', () => {
            carregar();
        });

        atualizarProdutoBtn.addEventListener('click', () => {
            atualizar();
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


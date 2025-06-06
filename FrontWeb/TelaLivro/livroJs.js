 // ##### Funções para o Envio(POST)
        // extrai os dados do form e cria um objeto para ser enviado
        // seguindo a estrutura do JSON
        function criarObjetoParaEnviar(){
            let formData = {
                nome: document.getElementById("nome").value,
                autor: document.getElementById("autor").value,
                isbn: parseInt(document.getElementById("isbn").value),
                genero: document.getElementById("genero").value,
            }

            return formData;
        }

        async function postLivro(event) {
            event.preventDefault();
            
            let formData = criarObjetoParaEnviar();
            
            try {
                let response = await fetch("http://localhost:8080/livro", {
                method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
    
                if(!response.ok){
                    alert("Erro do back-end" + response.status)
                    return
                }
    
                let data = await response.json()
    
                alert("Livro Cadastrado com Sucesso!");
            } catch (error) {
                alert("Erro na requisição: " + error.message)
                
            }
        }

        // ##### Funções para o carregar dados da tela(GET)
        function criarListaDeLivros(data){
            let lista = document.getElementById("listaLivros");
            lista.innerHTML = "";
            data.forEach(livro => {
                let item = document.createElement("li");
                item.textContent = `ID: ${livro.id} - Nome: ${livro.nome} - Autor: ${livro.autor} - ISBN: ${livro.isbn} - Genero: ${livro.genero}`;
                
                // botão de editar
                let btnLink = document.createElement("button");
                btnLink.textContent = "Editar";
                btnLink.target = "_blank";
                btnLink.style.marginLeft = "10px";
                btnLink.onclick = function() {
                    window.open(`livroEdit.html?id=${livro.id}`, '_blank');
                };
                item.appendChild(btnLink);

                // botão de deletar
                let btnDeletar = document.createElement("button")
                btnDeletar.textContent = "Deletar";
                btnDeletar.style.marginLeft = "10px";
                btnDeletar.onclick = function(){
                    deletarLivro(livro.id)
                }
                item.appendChild(btnDeletar);

                lista.appendChild(item);
            });
        }

        async function getLivros(event) {
            event.preventDefault()

            let generoBusca = document.getElementById("generoBusca").value; // acrecentando filtro de nome a busca, caso necessário

            try {
                let response = await fetch(`http://localhost:8080/livro?genero=${generoBusca}`, {
                method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                if(!response.ok){
                    alert("Erro do back-end" + response.status)
                    return
                }
    
                let data = await response.json()

                criarListaDeLivros(data);
            } catch (error) {
                alert("Erro na requisição: " + error.message)
            }
        }

        // ##### Funções para o deletar(DELETE)
        async function deletarLivro(id) {
            if (confirm("Tem certeza que deseja deletar este Livro?")) {
                try {
                    let response = await fetch(`http://localhost:8080/livro/${id}`, {
                    method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });
        
                    if(!response.ok){
                        alert("Erro do back-end" + response.status)
                        return
                    }
                    alert("Livro deletado com sucesso!");
                    getLivros();

                } catch (error) {
                    alert("Erro na requisição: " + error.message)
                }
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("livroForm").addEventListener("submit", postLivro);
            document.getElementById("livroBusca").addEventListener("submit", getLivros);
        });
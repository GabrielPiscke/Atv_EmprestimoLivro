  // ## Função para buscar os dados do Livro(GET)
        // funcao que vai pegar o id que esta na url e iniciar a busca dos dados
        function paramUrl(){
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) {
                getLivroPorId(id);
            }
        }

        function preencheCamposForm(data){
            document.getElementById("livroId").value = data.id;
            document.getElementById("nome").value = data.nome;
            document.getElementById("autor").value = data.autor;
            document.getElementById("isbn").value = data.isbn;
            document.getElementById("genero").value = data.genero;
        }

        async function getLivroPorId(id) {
         
            try {
                let response = await fetch(`http://localhost:8080/livro/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
    
                if(!response.ok){
                    alert("Erro do back-end " + response.status);
                    return
                }

                let data = await response.json();
                preencheCamposForm(data);

            } catch (error) {
                alert("Erro na requisição: " + error.message)
            }
        }

        // ## Editar livros(PUT)
        function criarObjetoJson(){
            let formData = {
                nome: document.getElementById("nome").value,
                autor: document.getElementById("autor").value,
                isbn: document.getElementById("isbn").value,
                genero: document.getElementById("genero").value
            };

            return formData;
        }

        async function putLivro(event) {
            event.preventDefault();
            let id = document.getElementById("livroId").value;
            let formData = criarObjetoJson()

            try {
                let response = await fetch(`http://localhost:8080/livro/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
    
                if(!response.ok){
                    alert("Erro do back-end " + response.status);
                    return
                }

                let data = await response.json();
                alert("Sucesso: " + JSON.stringify(data));

            } catch (error) {
                alert("Erro na requisição: " + error.message)
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("livroForm").addEventListener("submit", putLivro);
            paramUrl();
        });
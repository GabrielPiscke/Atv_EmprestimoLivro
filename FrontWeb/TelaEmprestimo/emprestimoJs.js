   
   let mapaClientes = new Map(); // Mapa para armazenar os clientes pelo id

   
   // rendizar lista de emprestimos
    function criarListaEmprestimos(data){
       

        let lista = document.getElementById("listaEmprestimo");
        lista.innerHTML = "";
        data.forEach(emprestimo => {
            let clienteId = emprestimo.cliente?.id ?? emprestimo.cliente_id;
            let nomeCliente = mapaClientes.get(parseInt(clienteId)) || "Sem nome!";
            let item = document.createElement("li");
            item.textContent = `ID: ${emprestimo.id} - Data Inicial: ${emprestimo.data_inicial} - DataFinal: ${emprestimo.data_final}
                - Cliente: ${nomeCliente}`; // Se o nome no banco de dados for null, entao ele retorna "sem nome"
                // se existir um nome apenas exibe o nome. Evitando assim erro
            
            // botão de editar
            let btnLink = document.createElement("button");
            btnLink.textContent = "Editar";
            btnLink.target = "_blank";
            btnLink.style.marginLeft = "10px";
            btnLink.onclick = function() {
                window.open(`emprestimoEdit.html?id=${emprestimo.id}`, '_blank');
            };
            item.appendChild(btnLink);

            // botão de editar
            let btnDeletar = document.createElement("button")
            btnDeletar.textContent = "Deletar";
            btnDeletar.style.marginLeft = "10px";
            btnDeletar.onclick = function(){
                deletarEmprestimo(emprestimo.id)
            }
            item.appendChild(btnDeletar);

            lista.appendChild(item);
        });
    }

    // preencher o campo select, com os clientes que estão no banco de dados
    function criarCampoSelectCliente(data){
        let select = document.getElementById("clienteSelect");
        // prenche o dropDown(com os dados)
        data.forEach(cliente => {
            let option = document.createElement("option");
            option.value = cliente.id; // valor que sera enviado ao fazer o submit do form
            option.textContent = cliente.nome; // nome que aparece para selecionar
            select.appendChild(option);
        });
    }

    // criar CheckBox dos livros que estão salvos no banco de dados
    function criarCheckBoxLivros(data){
        // Pegando o form
        const form = document.getElementById("emprestimoForm");

        // Cria os checkboxes
        data.forEach(livro => {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "livros";
            checkbox.value = livro.id; // colocar o value do checkbox como o id do livro

            let texto = document.createTextNode(` ${livro.nome}`);
            
            form.insertBefore(checkbox, form.lastElementChild);
            form.insertBefore(texto, form.lastElementChild);
            form.insertBefore(document.createElement("br"), form.lastElementChild);
        });
    }
    
    // Buscar Clientes
    async function getClientes(){
        try {
            let response = await fetch("http://localhost:8080/cliente", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
    
            if(!response.ok){
                alert("Erro do back-end" + response.status);
                return;
            }
    
            let data = await response.json();
    
            // Preenche o mapa: id => nome
            data.forEach(cliente => {
                mapaClientes.set(cliente.id, cliente.nome);
            });
    
            criarCampoSelectCliente(data);
        } catch (error) {
            alert("Erro na requisição: " + error.message);
        }
    }
    

    // Buscar Livros
    async function getLivros(){
        try {
            let response = await fetch("http://localhost:8080/livro", {
            method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if(!response.ok){
                alert("Erro do back-end" + response.status)
                return
            }

            let data = await response.json()

            criarCheckBoxLivros(data)
        } catch (error) {
            alert("Erro na requisição: " + error.message)
        }
    }


    // cria objeto para ser enviado na requisição
    function criarObjetoEmprestimo(){
        // Pegar todos os checkboxes selecionados
        let checkboxes = document.querySelectorAll('input[name="livros"]:checked');

        // Mapear os valores para um array de objetos com { id: x }
        let livrosSelecionados = Array.from(checkboxes).map(cb => ({
            id: parseInt(cb.value)
        }));
        
        let formData = {
            data_inicial: document.getElementById("dataInicial").value,
            data_final: document.getElementById("dataFinal").value,
            cliente:{
                id: document.getElementById("clienteSelect").value
            },
            livros: livrosSelecionados
        };

        return formData;
    }

    // enviar emprestimo
    async function postEmprestimo(event) {
        event.preventDefault();
        
        let formData = criarObjetoEmprestimo();
        console.log(formData);
        
        try {
            let response = await fetch("http://localhost:8080/emprestimo", {
            method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if(!response.ok){
                alert("Erro do back-end " + response.status)
                return
            }

            let data = await response.json();

            alert("Sucesso: " + JSON.stringify(data));
            getEmprestimo();
        } catch (error) {
            alert("Erro na requisição: " + error.message)
        }
    }

    // buscar lista de emprestimos
    async function getEmprestimo() {

        try {
            let response = await fetch("http://localhost:8080/emprestimo", {
            method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if(!response.ok){
                alert("Erro do back-end" + response.status)
                return
            }

            let data = await response.json();

            criarListaEmprestimos(data);
        } catch (error) {
            alert("Erro na requisição: " + error.message)
        }
    }

    // deletar emprestimo
    async function deletarEmprestimo(id) {
        if (confirm("Tem certeza que deseja deletar este emprestimo?")) {
            try {
                let response = await fetch(`http://localhost:8080/emprestimo/${id}`, {
                method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });
    
                if(!response.ok){
                    alert("Erro do back-end" + response.status)
                    return
                }
                alert("Emprestimo deletado com sucesso!");
                carregarEmprestimo();
            } catch (error) {
                alert("Erro na requisição: " + error.message)
            }
        }
    }

    document.addEventListener("DOMContentLoaded", async () => {
      await getClientes(); // buscar os clientes disponíveis no sistema, assim que a página carregar
        getLivros() ;// buscar os livros disponíveis no sistema assim que a página carregar
        document.getElementById("emprestimoForm").addEventListener("submit", postEmprestimo);
        document.getElementById("carregarEmprestimo").addEventListener("click", getEmprestimo);
    });
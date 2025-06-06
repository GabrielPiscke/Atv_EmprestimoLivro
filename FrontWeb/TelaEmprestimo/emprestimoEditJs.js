  // pegar parametro da URL
  function paramUrl(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        getEmprestimoPorId(id);
    }
}

// preenche os dados do Form com base no emprestimo
function preencherFormEmprestimo(data){
    document.getElementById("emprestimoId").value = data.id;
    document.getElementById("dataInicial").value = data.dataInicial;
    document.getElementById("dataFinal").value = data.dataFinal;
    document.getElementById("clienteSelect").value = data.cliente.id;

    let idsLivrosSelecionados = data.livros.map(livro => livro.id)

    let checkboxes = document.querySelectorAll('input[name="livros"]');
    checkboxes.forEach(checkbox => {
        const id = parseInt(checkbox.value);
        checkbox.checked = idsLivrosSelecionados.includes(id);
    });

}

// criar os campos de select com base nos cliente que estão no banco de dados
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

// criar o checkBox dos livros com base nos livros que estão no banco de dados
function criarCheckBoxLivros(data){
    // Pegando o form
    const form = document.getElementById("emprestimoForm");

    // Cria os checkboxes
    data.forEach(livro => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "livros";
        checkbox.value = livro.id;

        let texto = document.createTextNode(` ${livro.nome}`);
        
        form.insertBefore(checkbox, form.lastElementChild);
        form.insertBefore(texto, form.lastElementChild);
        form.insertBefore(document.createElement("br"), form.lastElementChild);
    });
}

// buscar os clientes(GET)
async function getClientes(){
    try {
        let response = await fetch("http://localhost:8080/cliente", {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        criarCampoSelectCliente(data)
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

// buscar os livros(GET)
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

// criar objeto que será enviado na requisição PUT
function criarObjeto(){
    // Pegar todos os checkboxes selecionados
    let checkboxes = document.querySelectorAll('input[name="livros"]:checked');

    // Mapear os valores para um array de objetos com { id: x }
    let livrosSelecionados = Array.from(checkboxes).map(cb => ({
        id: parseInt(cb.value)
    }));
    
    let formData = {
        dataInicial: document.getElementById("dataInicial").value,
        dataFinal: document.getElementById("dataFinal").value,
        cliente:{
            id: document.getElementById("clienteSelect").value
        },
        livros: livrosSelecionados
    };

    return formData;
}

// atualizar emprestimo(PUT)
async function putEmprestimo(event) {
    event.preventDefault();

    let formData = criarObjeto()

    let id = document.getElementById("emprestimoId").value
    
    try {
        let response = await fetch(`http://localhost:8080/emprestimo/${id}`, {
        method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        alert("Sucesso: " + JSON.stringify(data));
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

// buscar emprestimo com base no id
async function getEmprestimoPorId(id) {

    try {
        let response = await fetch(`http://localhost:8080/emprestimo/${id}`, {
        method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if(!response.ok){
            alert("Erro do back-end" + response.status)
            return
        }

        let data = await response.json()

        preencherFormEmprestimo(data);
    } catch (error) {
        alert("Erro na requisição: " + error.message)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getClientes() // quando a página carregar pega os clientes disponíveis no banco de dados
    getLivros() // quaando a página carregar pega os livros do banco de dados
    paramUrl() // quando a página carregar vai pegar o parametro da URL e depois fazer a requisição nesse emprestimo com base nesse id
    document.getElementById("emprestimoForm").addEventListener("submit", putEmprestimo);
});
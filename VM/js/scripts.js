// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "http://127.0.0.1:5000/vms/";

var VM1 = document.getElementById("#VM1");
const content = document.querySelector("#content");
// const VM2 = document.querySelector("#VM2");

/**
 * Da o Get e puxa informações das VMs em um json
 */
async function getVms() {
    const response = await fetch(url);

    console.log(response); // testando

    const data = await response.json(); // transforma em json
    console.log(data);

    let i = 0;
    /**
     * Itera pelas VMs salvas no database e cria novos cards de VMs
     */
    data.map((post) => {
        // criar um div para inserir tudo
        var cardDiv = document.createElement("div");
        cardDiv.className = "card w-50";

        // criar um div para inserir o card
        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        // criar o card
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "texto form-control p-5 mb-2 mr-sm-2";
        inputElement.style.marginRight = "2px";
        inputElement.style.border = "none";
        inputElement.style.background = "transparent";
        inputElement.id = post.nome;
        inputElement.name = "Codigo";
        inputElement.readOnly = true;
        inputElement.value = post.nome;

        // criar o subtexto
        var pElement = document.createElement("p");
        pElement.className = "card-text";
        pElement.textContent = "Localização: " + post.localizacao;

        // criar o botão gerenciar
        var divBotao = document.createElement("div");
        var aElement = document.createElement("a");
        aElement.href = "prod.html";
        aElement.className = "btn btn-primary";
        aElement.textContent = "Gerenciar";

        // criar o botão deletar
        var buttonElement = document.createElement("a");
        buttonElement.className = "btn btn-primary";
        buttonElement.textContent = "Deletar";
        buttonElement.onclick = function(){console.log("oi")};

        // adicionar os elementos filhos ao elemento card-body
        cardBodyDiv.appendChild(inputElement);
        cardBodyDiv.appendChild(pElement);
        divBotao.appendChild(aElement);
        divBotao.appendChild(buttonElement);
        cardBodyDiv.appendChild(divBotao);

        // adicionar o elemento card-body ao elemento card
        cardDiv.appendChild(cardBodyDiv);
        
        // adicionar o card ao corpo da página + quebra de linha
        content.appendChild(document.createElement("br"));
        content.appendChild(cardDiv);
        })

        i++;
    }

async function deletarVM(nome) {

    console.log(nome);
    
    // const nome = document.getElementById('#inputNome').value;

    // data = {
    //     "nome": nome,
    // }
    // const response = await fetch(url + nome, {
    //   method: "DELETE",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   redirect: "follow",
    //   referrerPolicy: "no-referrer",
    //   body: JSON.stringify(data),
    // });

    // window.location.href = "http://127.0.0.1:5500/VM/index.html"
}

getVms();


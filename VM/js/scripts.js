// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "http://127.0.0.1:5000/vms/";

const VMS = document.getElementById("VMS");
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

    /**
     * Itera pelas VMs salvas no database e cria novos cards de VMs
     */
    data.map((post) => {
            criaCardVM(post);
    })

}

/**
 * Cria um card de vm através de um elemento post
 * @param {*} post 
 */
async function criaCardVM(post) {
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
    inputElement.style.fontSize = "20px";
    inputElement.id = post.nome;
    inputElement.readOnly = true;
    inputElement.value = "Nome: " + post.nome;

    // criar o subtexto
    var pElement = document.createElement("p");
    pElement.className = "card-text";
    pElement.textContent = "Localização: " + post.localizacao;

    // criar o botão gerenciar
    var aElement = document.createElement("a");
    aElement.href = "prod.html";
    aElement.className = "btn btn-primary";
    aElement.textContent = "Gerenciar";

    // adicionar os elementos filhos ao elemento card-body
    cardBodyDiv.appendChild(inputElement);
    cardBodyDiv.appendChild(pElement);
    cardBodyDiv.appendChild(aElement);

    // adicionar o elemento card-body ao elemento card
    cardDiv.appendChild(cardBodyDiv);
    
    // adicionar o card ao corpo da página + quebra de linha
    VMS.appendChild(document.createElement("br"));
    VMS.appendChild(cardDiv);
}

getVms();


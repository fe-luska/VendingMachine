// const url = "https://jsonplaceholder.typicode.com/posts";
const url = "http://127.0.0.1:5000/vms/";

var VM1 = document.getElementById("#VM1");
// const VM2 = document.querySelector("#VM2");

/**
 * Da o Get e puxa informações das VMs em um json
 */
async function getVms() {
    const response = await fetch(url);

    console.log(response); // testando

    const data = await response.json(); // transforma em json
    console.log(data);

    data.map((post) => {
        VM1.value = post.nome; // atribui o campo nome ao valor de VM1
    })
}

getVms();
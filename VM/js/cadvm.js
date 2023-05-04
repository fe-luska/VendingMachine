const url = "http://127.0.0.1:5000/vms/";
var bSalvar = document.getElementById("bSalvar");

/**
 * Executa um post request
 * @param {*} url 
 * @param {*} data 
 * @returns 
 */
 async function postVM() {

    const nome = document.getElementById('#inputNome').value;
    const localizacao = document.getElementById('#inputLoc').value;

    data = {
        "nome": nome,
        "localizacao": localizacao
    }
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    window.location.href = "http://127.0.0.1:5500/VM/index.html"
}
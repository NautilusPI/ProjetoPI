let idEmpresa = sessionStorage.ID_EMPRESA;
let nomeTanque = '';

function irParaDashboardTanque(tanque) {
  window.location.href = `./dashboard/dashboardTanque.html`;
}

fetch(`/dash/totalTanques/${idEmpresa}`)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    document.getElementById("kpiTanques").innerHTML = dados[0].totalTanques;
  })
  .catch(function (erro) {
    console.log(erro);
  });

fetch(`/dash/sensoresOffline/${idEmpresa}`)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    let lista = "";

    for (let i = 0; i < dados.length; i++) {
      lista += `
             ${dados[i].idTanque}
        `;
    }

    document.getElementById("kpiOffline").innerHTML = dados.length;

    let faixa = document.getElementById("statusOffline");
    faixa.style.display = "flex";
    document.getElementById("tanquesOffline").innerHTML = lista;
  })
  .catch(function (erro) {
    console.log(erro);
  });

fetch(`/dash/statusViveiro/${idEmpresa}`)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    let total = dados[0].totalCritico;

    let status = "";

     if (total >= 3) {
      status = "Crítico";
         document.getElementById("kpiStatus").style.color = "#bf5959"
    } else if (total >= 1) {
        status = "Atenção";
         document.getElementById("kpiStatus").style.color = "#bfb059"
    } else {
        status = "Estável";
         document.getElementById("kpiStatus").style.color = "#6bbf59"
    }

    document.getElementById("kpiStatus").innerHTML = status;
  })
  .catch(function (erro) {
    console.log(erro);
  });

fetch(`/dash/tanquesRisco/${idEmpresa}`)
  .then(function (resposta) {
    return resposta.json();
  })

  .then(function (dados) {
    document.getElementById("kpiRisco").innerHTML = dados[0].tanquesRisco;
  })

  .catch(function (erro) {
    console.log(erro);
  });


  function deslogar() {
  sessionStorage.clear();
  window.location = "../index.html";
  };
fetch("/dash/totalTanques")
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    document.getElementById("kpiTanques").innerHTML = dados[0].totalTanques;
  })
  .catch(function (erro) {
    console.log(erro);
  });

fetch("/dash/sensoresOffline")
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

fetch("/dash/statusViveiro")
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    let total = dados[0].totalRisco;

    let status = "";

    if (total >= 4) {
      status = "Crítico";
        // document.getElementsByClassName("CorStatus").style.color = "#6bbf59"
    } else if (total >= 2) {
        status = "Atenção";
        // document.getElementsByClassName("CorStatus").style.color = "#bfb059"
    } else {
        status = "Estável";
        // document.getElementsByClassName("CorStatus").style.color = "#bf5959"
    }

    document.getElementById("kpiStatus").innerHTML = status;
  })
  .catch(function (erro) {
    console.log(erro);
  });

fetch("/dash/tanquesRisco")
  .then(function (resposta) {
    return resposta.json();
  })

  .then(function (dados) {
    document.getElementById("kpiRisco").innerHTML = dados[0].tanquesRisco;
  })

  .catch(function (erro) {
    console.log(erro);
  });

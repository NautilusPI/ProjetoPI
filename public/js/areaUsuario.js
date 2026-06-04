window.onload = function () {
  listarDados();

  var nomeUsuario = sessionStorage.NOME_USUARIO;
  span_nomeUsuario.innerHTML = nomeUsuario;
};

function mudarCorDash() {
  document.getElementById("dashCinza").style.display = "none";
  document.getElementById("dashCor").style.display = "flex";
}

function voltarCinzaDash() {
  document.getElementById("dashCinza").style.display = "flex";
  document.getElementById("dashCor").style.display = "none";
}

function mudarCorManual() {
  document.getElementById("manualCinza").style.display = "none";
  document.getElementById("manualCor").style.display = "flex";
}

function voltarCinzaManual() {
  document.getElementById("manualCinza").style.display = "flex";
  document.getElementById("manualCor").style.display = "none";
}

function mudarCorSup() {
  document.getElementById("supCinza").style.display = "none";
  document.getElementById("supCor").style.display = "flex";
}

function voltarCinzaSup() {
  document.getElementById("supCinza").style.display = "flex";
  document.getElementById("supCor").style.display = "none";
}

function deslogar() {
  sessionStorage.clear();
  window.location = "index.html";
}

function cadastrarTanques() {
  var nomeTanqueVar = ipt_nomeTanque.value;
  var nomeSetorVar = ipt_setor.value;
  var capacidadeVar = Number(ipt_capacidade.value);
  var idUsuarioVar = sessionStorage.ID_USUARIO;

  if (
  nomeTanqueVar == "" ||
  nomeSetorVar == "" ||
  capacidadeVar <= 0
  ) {
  let alerta = document.getElementById("div_mensagem");
  alerta.style.color = '#FF0000'
  alerta.innerHTML = "Preencha todos os campos!";

  setTimeout(() => {
    alerta.innerHTML = "";
  }, 3500);

  return false;
  }

  fetch("/areaUsuario/cadastrarTanque", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeTanqueServer: nomeTanqueVar,
      nomeSetorServer: nomeSetorVar,
      capacidadeServer: capacidadeVar,
      idUsuarioServer: idUsuarioVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        listarDados();

        ipt_nomeTanque.value = "";
        ipt_setor.value = "";
        ipt_capacidade.value = "";

        let alerta = document.getElementById("div_mensagem");
        alerta.style.color = '#90EE90'
        alerta.innerHTML = "Tanque cadastrado com sucesso!";
        setTimeout(() => {
          alerta.innerHTML = "";
        }, 3500);
      
      } else {
        resposta.text().then((texto) => {
          console.error(texto);
          let alerta = document.getElementById("div_mensagem");
          alerta.style.color = '#FF0000'
          alerta.innerHTML = "Erro ao cadastrar o tanque!";

          setTimeout(() => {
            alerta.innerHTML = "";
          }, 3500);
        });
      }
    })
    .catch(function (erro) {
    console.log(`#ERRO: ${erro}`);
    let alerta = document.getElementById("div_mensagem");
    alerta.style.color = '#FF0000'
    alerta.innerHTML = "Erro ao cadastrar o tanque!";

      setTimeout(() => {
        alerta.innerHTML = "";
      }, 3500);
});

  return false;
}

function listarDados() {
  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/areaUsuario/listarDados/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (dados) {
          div_tanques.innerHTML = "";

          for (let i = 0; i < dados.tanques.length; i++) {
            let tanque = dados.tanques[i];

            let nomeTanquelink = encodeURIComponent(tanque.NomeTanque);
            let capacidadelink = encodeURIComponent(tanque.CapacidadeLitros);
            let setorlink = encodeURIComponent(tanque.Setor);
            let enderecolink = encodeURIComponent(tanque.Endereco);
            let cnpjlink = encodeURIComponent(tanque.CNPJ);
            let emaillink = encodeURIComponent(sessionStorage.EMAIL_USUARIO);
            let nomelink = encodeURIComponent(sessionStorage.NOME_USUARIO);

            let linkInstalacao = `
         <a target="_blank"
        href="https://nautilushelp.atlassian.net/servicedesk/customer/portal/34/group/39/create/10084?summary=Instalação+de+sensor+em+tanque&customfield_10198=${nomelink}&customfield_10199=${cnpjlink}&customfield_10200=${emaillink}&customfield_10204=${enderecolink}&customfield_10201=${nomeTanquelink}&customfield_10202=${setorlink}&customfield_10203=${capacidadelink}">
        </a>
         `;

            for (let j = 0; j < dados.sensores.length; j++) {
              if (dados.sensores[j].fkTanque == tanque.idTanque) {
                linkInstalacao = "";
                break;
              }
            }

            let formatarLitros = Number(tanque.CapacidadeLitros).toLocaleString(
              "pt-BR",
            );

            div_tanques.innerHTML += `
          <div class="cardsTanque">
           <span>
               <b>Nome:</b> ${tanque.NomeTanque}
               <br>
               <b>Setor:</b> ${tanque.Setor}
               <br>
               <b>Capacidade:</b> ${formatarLitros} L
               ${linkInstalacao}
           </span>
          </div>
              `;
          }
        });
      } else {
        console.log("Erro ao buscar tanques");
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

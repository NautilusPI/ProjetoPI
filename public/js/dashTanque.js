let linhasDeMedidaMaxima = [];
let linhasDeMedidaRiscoQuente = [];
let linhasDeMedidaRiscoFrio = [];
let linhasDeMedidaMinimo = [];
let faixaSegura = [];
let min = 50;
let max = 0;
function buscarRegistroTanque() {
  const dataInicio = dataInicioInput.value
  const dataFim = dataFimInput.value
  const temperaturasLista = [];
  let horasLista = [];
  fetch(`/dash/graficoTanqueEspecifico/2/${dataInicio}/${dataFim}`).then((dados) => {
    dados.json().then((registros) => {
      for (let i = 0; i < registros.length; i++) {
        let temperatura = registros[i].registroTemperatura
        temperaturasLista.push(temperatura);
        if(temperatura < min){
          min = Number( Number(temperatura).toFixed())
        }
        if(temperatura >max){
          max = Number(Number(temperatura).toFixed())
        }
        let hora = registros[i].dataHora.substring(11, 16);
        horasLista.push(hora);
        linhasDeMedidaMaxima.push(33);
        linhasDeMedidaRiscoQuente.push(30);
        linhasDeMedidaRiscoFrio.push(25);
        faixaSegura.push(25);
        linhasDeMedidaMinimo.push(23);
      }
      if (registros.length == temperaturasLista.length) {
        chamarGrafico(temperaturasLista, horasLista);
      }
    });
  });
}

function chamarGrafico(temps, horas) {
  console.log(temps);

  document.getElementById("containerGrafico").innerHTML =
    '<canvas id="sensorAnalogico"></canvas>';
  var sensorAnalogico = new Chart(
    document.getElementById("sensorAnalogico").getContext("2d"),
    {
      type: "line",

      data: {
        labels: horas,
        datasets: [
          {
            label: "Temperatura",
            data: temps,
            borderWidth: 1,
            tension: 0.3,
            fill: true,
            order: 100,
            pointRadius: 1,
            borderColor: "#4DA3B8",
            backgroundColor: "rgba(77, 163, 184, 0.2)",
          },

          {
            type: "line",
            data: linhasDeMedidaMaxima,
            borderColor: "rgba(231, 76, 60, 0.3)",
            borderWidth: 2,
            
            borderDash: [6, 6],
            pointRadius: 0,
          },
          {
            type: "line",
            data: faixaSegura,
            borderColor: "green",
            borderWidth: 0,
            pointRadius: 0,
            fill: "+1",
            order: 1,
            backgroundColor: "rgba(34, 197, 94, 0.14)",
          },
          {
            type: "line",
            data: linhasDeMedidaRiscoQuente,
            borderColor: "rgba(243, 156, 18, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },

          {
            type: "line",
            data: linhasDeMedidaRiscoFrio,
            borderColor: "rgba(243, 156, 18, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },

          {
            type: "line",
            data: linhasDeMedidaMinimo,
            borderColor: "rgba(231, 76, 60, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // remove as linhas de fundo
            },
            border: {
              display: false, // remove a linha do eixo (ESSA AQUI)
            },
          },
          y: {
            grid: {
              display: false, // remove as linhas de fundo
            },
            min: min -3,
            max: max +3,
            beginAtZero: false,
          },
        },
      },
    },
  );
}

buscarRegistroTanque();
setInterval(()=>{
buscarRegistroTanque();
console.log('atualizando')
},2000)
function buscarRegistroTanque() {
    let temperaturasLista =[]
    let horasLista =[]
  fetch(`/dash/graficoTanqueEspecifico/2`).then((dados) => {
    dados.json().then((registros) => {
      for (let i = 0; i < registros.length; i++) {
        temperaturasLista.push(registros[i].registroTemperatura);
        let hora = registros[i].dataHora.substring(11, 16);
        horasLista.push(hora);
      }
      if (registros.length == temperaturasLista.length) {
        chamarGrafico(temperaturasLista,horasLista);
      }
    });
  });
}

function chamarGrafico(temps,horas) {
  console.log(temps);

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
            tension: 0.5,
            fill: true,
            pointRadius: 2,
            borderColor: "#4DA3B8",
            backgroundColor: "rgba(77, 163, 184, 0.2)",
          },
          {
            type: "line",
            data: [
              33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33,
              33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33,
              3333, 33, 33, 33, 33, 33, 33, 33, 33,
            ],
            borderColor: "rgba(231, 76, 60, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },

          {
            type: "line",
            data: [
              30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
              30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
            ],
            borderColor: "rgba(243, 156, 18, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },

          {
            type: "line",
            data: [
              26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
              26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
            ],
            borderColor: "rgba(243, 156, 18, 0.3)",
            borderWidth: 2,
            borderDash: [6, 6],
            pointRadius: 0,
          },

          {
            type: "line",
            data: [
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
              23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
            ],
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
        maintainAspectRatio: true,
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
            min: 18,
            max: 38,
            beginAtZero: false,
          },
        },
      },
    },
  );
}

buscarRegistroTanque();

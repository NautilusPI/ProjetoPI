 function exibirA() {
        document.getElementById("conteudoB").style.display = "none"
        document.getElementById("conteudoC").style.display = "none"

        document.getElementById("conteudoA").style.display = "flex"
    }

    function mudarCorDash() {
        document.getElementById("dashCinza").style.display = "none"
        document.getElementById("dashCor").style.display = "flex"
    }

    function voltarCinzaDash() {
        document.getElementById("dashCinza").style.display = "flex"
        document.getElementById("dashCor").style.display = "none"
    }

    function exibirB() {
        document.getElementById("conteudoA").style.display = "none"
        document.getElementById("conteudoC").style.display = "none"

        document.getElementById("conteudoB").style.display = "flex"
    }

    function mudarCorManual() {
        document.getElementById("manualCinza").style.display = "none"
        document.getElementById("manualCor").style.display = "flex"
        
    }

    function voltarCinzaManual() {
        document.getElementById("manualCinza").style.display = "flex"
        document.getElementById("manualCor").style.display = "none"
    }

    function exibirC() {
        document.getElementById("conteudoB").style.display = "none"
        document.getElementById("conteudoA").style.display = "none"

        document.getElementById("conteudoC").style.display = "flex"
    }

    function mudarCorSup() {
        document.getElementById("supCinza").style.display = "none"
        document.getElementById("supCor").style.display = "flex"
        
    }

    function voltarCinzaSup() {
        document.getElementById("supCinza").style.display = "flex"
        document.getElementById("supCor").style.display = "none"
    }

    function deslogar() {
        sessionStorage.clear();
        window.location = "index.html"
    }
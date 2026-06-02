 function exibirA() {
        document.getElementById("conteudoB").style.display = "none"
        document.getElementById("conteudoC").style.display = "none"

        document.getElementById("conteudoA").style.display = "flex"
    }

    function exibirB() {
        document.getElementById("conteudoA").style.display = "none"
        document.getElementById("conteudoC").style.display = "none"

        document.getElementById("conteudoB").style.display = "flex"
    }

    function exibirC() {
        document.getElementById("conteudoB").style.display = "none"
        document.getElementById("conteudoA").style.display = "none"

        document.getElementById("conteudoC").style.display = "flex"
    }

    function deslogar() {
        sessionStorage.clear();
        window.location = "index.html"
    }
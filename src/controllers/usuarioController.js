var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        email: resultadoAutenticar[0].Email,
                        nome: resultadoAutenticar[0].Nome
                    });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var codigo = req.body.codigoServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (!nome || !email || !cpf || !codigo || !senha) {
        return res.status(400).send("Preencha todos os campos obrigatórios!");
    }

    usuarioModel.buscarEmpresaPorCodigo(codigo)
        .then(function (empresas) {
            if (empresas.length == 0) {
                return res.status(400).send("Código de ativação inválido!");
            }

            var idEmpresa = empresas[0].idEmpresa;

            return usuarioModel.cadastrar(nome, email, cpf, senha, idEmpresa)
                .then(function (resultado) {
                    res.json({ mensagem: "Cadastro realizado com sucesso!" });
                });
        })
        .catch(function (erro) {
            console.log("Erro ao cadastrar:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar
}
<p align="center">
  <img src="public\assets\Home\logo.png" width="180">
</p>

<h1 align="center">Nautilus</h1>

<p align="center">
Sistema de monitoramento de temperatura dentro dos tanques de criação de tilápia 
</p>


---

#  Sobre o projeto

O projeto consiste em um sistema IoT para monitoramento da temperatura em tanques de criação de tilápias. Sensores instalados nos tanques enviam dados em tempo real para uma plataforma web, que apresenta dashboards, KPIs e uma calculadora financeira para auxiliar na gestão da produção. O sistema também emite alertas automáticos em situações críticas e possui níveis de acesso diferenciados conforme o perfil do usuário, contribuindo para uma tomada de decisão mais rápida e eficiente.

---

#  Funcionalidades

* Cadastro e login;
* Acessos rápidos para plataforma de suporte (jira);
* Cadastro de tanques;
* Dashboard de monitoramento.
* Alertas.
* ChatBot para auxilio no suporte.
* Simulador de prejuizos.


---

#  Tecnologias utilizadas

###  Front-end

* <img src="https://skillicons.dev/icons?i=html" width="20"/> HTML
* <img src="https://skillicons.dev/icons?i=css" width="20"/> CSS
* <img src="https://skillicons.dev/icons?i=js" width="20"/> JavaScript

###  Back-end

* <img src="https://skillicons.dev/icons?i=nodejs" width="20"/> Node.js

###  Banco de Dados

* <img src="https://skillicons.dev/icons?i=mysql" width="20"/> MySQL

###  Ferramentas

* <img src="https://skillicons.dev/icons?i=git" width="20"/> Git
* <img src="https://skillicons.dev/icons?i=github" width="20"/> GitHub
* <img src="https://skillicons.dev/icons?i=figma" width="20"/> Figma
* <img src="https://cdn.simpleicons.org/trello/0052CC" width="20"/> Trello
* <img src="https://cdn.simpleicons.org/mysql/4479A1" width="20"/> MySQL Workbench
* <img src="https://cdn.simpleicons.org/jira/0052CC" width="20"/> Jira
* <img src="https://cdn.simpleicons.org/arduino/00878F" width="20"/> Arduino Uno e Sensor LM35
---
# ⚙️ Como usar

### 1. Clone este repositório em sua máquina

```bash
git clone https://github.com/NautilusPI/ProjetoPI
```

---

### 2. Crie as tabelas necessárias no Banco de Dados

Siga as instruções presentes no arquivo:

```text
/src/database/script-tabelas.sql
```

---

### 3. Configure o ambiente da aplicação


Atualize o arquivo .env.example para .env e adicionando as credenciais de conexão com o banco de dados.
<br>
seguindo as instruções presentes neles.


---


### 5. Instale as dependências

No terminal, execute:

```bash
npm i
```

Este comando instalará todas as bibliotecas necessárias para a execução do projeto, listadas no arquivo `package.json`.

Ao final da instalação, será criada automaticamente a pasta:

```text
node_modules
```

que contém todas as dependências utilizadas pelo sistema.

---

### 6. Inicie a aplicação

Execute:

```bash
npm start
```

A aplicação será iniciada conforme a configuração realizada anteriormente.

---

### 7. Acesse o projeto

Após a inicialização, abra em seu navegador o endereço informado no terminal.

---

### 8. Encerrar a execução

Para interromper a aplicação, pressione:

```text
CTRL + C
```

no terminal em que ela estiver sendo executada.

---


# 🎓 Projeto Acadêmico

A Nautilus foi desenvolvida como um projeto acadêmico interdisciplinar do curso de Análise e Desenvolvimento de Sistemas da SPTech School. Ao longo de todo o semestre, a equipe aplicou os conhecimentos adquiridos em sala de aula para desenvolver uma solução IoT voltada ao monitoramento da temperatura em tanques de criação de tilápias. Durante o desenvolvimento, houve mudanças na composição da equipe, exigindo adaptação e colaboração contínua entre os membros, proporcionando uma experiência prática em trabalho em equipe, metodologias ágeis e desenvolvimento de software.


##  Instituição

**São Paulo Tech School (SPTech)**

Curso de **Análise e Desenvolvimento de Sistemas**

**1º Semestre**

Disciplina: **Pesquisa e Inovação**


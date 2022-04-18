<h1 align="center">Developer WEB Dashboard</h1>
<div align="center">👨‍💻</div>
</br>

## ✨ Tecnologias

</br>
<div style="text-align: center;">
  <a href="https://nodejs.org/en/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" title="Documentação do Nodejs"/>
  </a>
  <a href="https://pt-br.reactjs.org/" target="_blank">
    <img alt="TypeScript" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" title="Documentação do React"/>
  </a>
  <a href="https://www.typescriptlang.org/docs/" target="_blank">
    <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" title="Documentação do TypeScript"/>
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" title="Documentação do Docker"/>
  </a>
  <a href="https://eslint.org/docs/user-guide/getting-started" target="_blank">
    <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" title="Documentação do ESLint"/>
  </a>
  <a href="https://www.linux.org/pages/download/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Linux-E34F26?style=for-the-badge&logo=linux&logoColor=black" title="Documentação do Linux"/>
  </a>
</div>
</br>

## 💻 Projeto

Este é projeto se baseia em alguns fluxos de manutenções de dados de desenvolvedores e de níveis relacionados aos desenvolvedores, possuindo telas que realizam manutenções para cada fluxos
utilizando API REST com os métodos (​GET​, ​POST​, ​PUT/PATCH​ e ​DELETE​).

[👉 Acessar versão de teste.](https://developer-web-dashboard.vercel.app)

### 📒 Documentação

- <a href="#-instalação" >(APP) Instalação</a>
  - <a href="#-ambiente-de-desenvolvimento" >Desenvolvimento</a>
  - <a href="#-ambiente-de-produção" >Produção</a>

</br>

---

</br>

## 🚀 Instalação

</br>

### 👨‍💻 Ambiente de desenvolvimento

</br>
⚠️ Requisitos
<table style="width: 100%;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Versão</th>
      <th>Link para Instalação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GIT</td>
      <td>^2.25.1</td>
      <td><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Make</td>
      <td>^4.2.1</td>
      <td><a href="https://howtoinstall.co/pt/make" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Node.js</td>
      <td>^16.14.0</td>
      <td><a href="https://nodejs.org/en/download/" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Yarn</td>
      <td>^1.22.11</td>
      <td><a href="https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable" target="_blank">👉 Acessar</a></td>
    </tr>
  </tbody>
</table>
</br>

1. Clone o repositório:

   ```console
   # SSH
   $ git@github.com:lucasoliveiraw00/developer-web-dashboard.git
   ```

2. Gere o arquivo .env:

   [_Preencher o arquivo .env com os dados de ambiente de desenvolvimento._](/docs/examples/)

   ```console
   $ cp .env.example .env
   ```

3. Realize o build do projeto:

   ```console
   $ make build
   ```

4. Iniciar o projeto:

   ```console
   $ make up
   ```

</br>

### 🌐 Ambiente de produção

</br>
⚠️ Requisitos
<table style="width: 100%;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Versão</th>
      <th>Link para Instalação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GIT</td>
      <td>^2.25.1</td>
      <td><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Make</td>
      <td>^4.2.1</td>
      <td><a href="https://howtoinstall.co/pt/make" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker</td>
      <td>^20.10.12</td>
      <td><a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker Compose</td>
      <td>^1.29.2</td>
      <td><a href="https://docs.docker.com/compose/install/" target="_blank">👉 Acessar</a></td>
    </tr>
  </tbody>
</table>
</br>

1. Clone o repositório:

   ```console
   # SSH
   $ git@github.com:lucasoliveiraw00/developer-web-dashboard.git
   ```

2. Gere o arquivo .env:

   _Preencher o arquivo .env com os dados de ambiente de produção._

   ```console
   $ cp .env.example .env
   ```

3. Realize o build do projeto:

   ```console
   $ make build
   ```

4. Iniciar o projeto:

   ```console
   $ make up
   ```

</br>

---

</br>

## 🤖 Recursos

- ⚡️ [Next.js 12](https://nextjs.org/)
- ⚛️ [React 17](https://pt-br.reactjs.org/)
- 🪄 [Ant Design](https://ant.design/)
- 💅 [Stitches](https://stitches.dev/)
- 💫 [TypeScript](https://www.typescriptlang.org/)
- 🐶 [Husky](https://typicode.github.io/husky/#/)
- 📄 [Commitizen](https://github.com/commitizen/cz-cli)
- 🚓 [Commitlint](https://github.com/conventional-changelog/commitlint)
- 📏 [ESLint](https://eslint.org/)
- ⚙️ [EditorConfig](https://editorconfig.org/)
- 💖 [Prettier](https://prettier.io/)
- 🚫 [Lint Staged](https://github.com/okonet/lint-staged)

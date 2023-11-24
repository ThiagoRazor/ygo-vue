# Yu-Gi-Oh Forbidden Memories Database!

![Database Screenshot](https://raw.githubusercontent.com/ThiagoRazor/ygo-vue/main/client/src/assets/Screenshot%202023-11-24%20at%2016-49-30%20Vite%20App.png)

Esta é uma aplicação web desenvolvida com Vue.js que consome dados do Firestore Database (Firebase) 
apresentando informações detalhadas sobre mais de 700 Cards, incluindo seus nomes, IDs, price, password 
e uma drop list referente à cada duelista sobre o jogo Yu-Gi-Oh! Forbidden Memories do Playstation 1. 

## Demonstração ao Vivo

Confira o [Database em ação](https://forbidden-database.web.app/) no Firebase Hosting.

## Recursos

- Vue.js: Framework Javascript progressivo para construção de interfaces de usuário.

- Firestore Database: Fonte de dados oficial dos Cards e Duelistas.

- Tailwind CSS: Framerwork de utilidades CSS para criar interfaces.

- Firebase Storage: Fonte de imagens de Cards e Duelistas.

- Pinia: Biblioteca de store para Vue, permite partilhar um estado entre os componentes ou páginas.

- Vue Router: Gerenciamento de rotas para criar uma experiência de navegação suave.

- XLSX: Analisador e gravador de dados de planilha (Usado para submeter os cards e info das drops dos duelistas). 
  
## Como Rodar Localmente

1. Clone este repositório:
```sh
git clone https://github.com/ThiagoRazor/ygo-vue.git
```
2. Instale as dependências:
```sh
   npm install
```
3. Inicie o servidor de desenvolvimento:
```sh
  npm run serve
```
4. Abra o projeto no seu navegador em `http://localhost:5173`.

## Funcionalidades 

- [x] Listagem dos Cards com nomes, IDs, price, password e description.
- [x] Detalhes individuais dos Card.
- [x] Informações de drop rate dos cards por cada duelista.
- [x] Pesquisa de Card por nome e id.

## Autor

- [Thiago de Oliveira da Silva](https://github.com/ThiagoRazor) - Desenvolvedor principal

---

Divirta-se explorando o Yu-Gi-Oh! Database. It's time to duel!!!

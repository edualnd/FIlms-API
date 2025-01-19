
# 🎥 API Films

Uma API simples para gerenciamento de filmes, desenvolvida com Node.js, Express, MongoDB e Mongoose. O projeto inclui uma pagina HTML para que as operações CRUD sejam mais simples.

## 📋 Funcionalidades
- Listar todos os filmes cadastrados.
- Adicionar novos filmes (com título, imagem, ano e descrição).
- Atualizar informações de filmes existentes.
- Excluir filmes do banco de dados.

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório
```
https://github.com/EduAlnd/FIlms-API.git
```
### 2. Instale as dependẽncias
```
npm install
```
### 3. Crie um cluster no mongodb
A crição do cluster é bem simples, e grátis, só é preciso se cadastrar no site do [MongoDB](https://www.mongodb.com/pt-br/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_amers-all_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14412646314&adgroup=131761122172&cq_cmp=14412646314&gad_source=1&gclid=Cj0KCQiAv628BhC2ARIsAIJIiK99KuHAndzx3AWt-hmo_9vquC3c0v-ONA2g1w8WHgJkD0DafMjf7NoaArsZEALw_wcB)
### 4. Configure o banco de dados
No index.js, coloque o link do seu banco de dados.
Ex:
``` 
mongodb+srv://name:password@filmsapi.ziemu.mongodb.net/?retryWrites=true&w=majority&appName=FilmsApi
```
Lembre se de que o link não vem com a senha, então é necessario trocar <db_password>, para a sua senha.

### 5. Inicie o servidor

```
npm run server
```
## Rotas da API

#### Create flm

```http
  POST /create
```

#### Get all films
```http
  GET /list
```

#### Get film

```http
  GET /find/:title
```
#### Update film
```http
  PUT /update/:title
```
#### Delete film
```http
  DELETE /delete/:title
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


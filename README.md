# API CalculateFixedIncomeInvestment

O intuito desse projeto é calcular um investimento atrelado ao CDI a partir de uma data inicial de investimento e uma data atual.

## Desenvolvendo

### Built With

Lista das principais bibliotecas:
 * [config](https://www.npmjs.com/package/config)
 * [csvtojson](https://www.npmjs.com/package/csvtojson)
 * [express](https://www.npmjs.com/package/express)
 * [mongoose](https://www.npmjs.com/package/mongoose)
 * [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
 
 ### Pré-requisitos
Você precisará configurar seu ambiente. Para isso se faz necessário ter instalado:
 - [MongoDB](https://www.mongodb.com/)
 - [Node.js](https://nodejs.org/en/).

Obs.: a connectionstring atual da aplicação está apontando para um banco mongoDB meu, então não há necessidade de se instalar o mongoDB localmente.

### Configurando

Para poder simular a aplicação localmente, basta efetuar os seguintes passos:

```shell
git clone https://github.com/albinolima84/CalculateFixedIncomeInvestment
cd CalculateFixedIncomeInvestment/
npm install
npm start
```

## Estrutura

```
    .dockerignore
    .gitignore
    app.js
    docker-compose.yaml
    Dockerfile
    package.json
    README.md
    swagger.json
    ├── config
    |   ├── config.js
    ├── controllers
    |   ├── calculator.js
    |   ├── data-import.js
    ├── models
    |   ├── cdi.js
    ├── repositories
    |   ├── cdi-repositorio.js
    |   ├── CDI.csv (arquivo para importação dos dados no mongoDB)
    ├── routes
    |   ├── calculator-route.js
    |   ├── data-import-route.js
    ├── services
    |   ├── import-cdi.js
    |   ├── investment-calculator.js
```

## Versionamento

 * Projeto versionado no github: https://github.com/albinolima84/CalculateFixedIncomeInvestment

## Tests

 * TODO

## Referência de API

> `POST      /calculator`

> `GET      /data-import`

> `POST     /data-import`

 - Para maiores detalhes: http://localhost:3000/swagger


## Database

[MongoDB](https://www.mongodb.com/)

 - Exemplo de Schema CDI

```javascript
const IndexSchema = new mongoose.Schema({
    rateValue: {
        type: Number,
        required: true
    },
    rateDate: {
        type: Date,
        required: true,
        unique: true,
        index: true
    }
});

```

## Licensing

[Apache License Version 2.0](./LICENSE)

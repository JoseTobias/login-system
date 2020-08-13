# Instruções para rodar o projeto

## API

Para que a api tenha acesso ao banco de dados é nessesário colocar a senha (process.env.DATABASE_PASSWORD) no arquivo src/config/database.js ou colocar um outro banco de dados (mongoDB) para subtituir o que está lá.

1 - Entrar na pasta raiz da api e instalar as dependências com o comando: 

```
npm install
```

2 - Quando finalizar a instalação, executar o comando para executar a api.

Ambiente de produção: 
```
npm run production
```

Ambiente de desenvolvimento: 
```
npm run dev
```

## Front

1 - Entrar na pasta raiz do front e instalar as dependências com o comando: 

```
npm install
```

2 - Executar: 

Caso queira executar no ambiente de produção
```
npm run build
npm run serve
```

Caso queira executar no ambiente de desenvolvimento:
```
npm run serve
```

# Sobre o projeto
É um sistema de login que possui as funcionalidades:
- Cadastro: Cadastra o usuário no sistema.
- Login: Faz o login do usuário cadastrado.
- Updatre: Faz a atualização dos dados se o usuário que fizer o login desejar.
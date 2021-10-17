# Desafio WA

## Como rodar o projeto

### Docker

Para rodar a aplicação com o docker, basta rodar o seguinte comando:
```
docker-compose up -d
```

### Sem o docker

Para rodar o projeto sem o docker, você precisa ter algumas dependencias instaladas na sua maquina, são elas:
- [Postgres](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

Tendo as dependencias instaladas, basta adapta o .env do projeto
```
cp ./.env.example ./.env
```
Edite o arquivo .env com as informações que você configurou do postgres

Rode as migrations para sincronizar seu banco com a aplicação
```
yarn typeorm migration:run
```

Tendo o banco local sincronizado com o que a aplicação espera rode o seguinte comando para subir o projeto:
```
yarn build && node ./dist/main.js
```
Parabéns, pode abrir a seguinte rota para ver quais recursos estão disponivel para uso
```
http://localhost:3000/docs
```

## Decisões técnicas

<br />

### Typescript
Vejo o typescript extremamente benéfico para trabalhar em equipe, pois a tipagem ajuda muito a novos integrantes e até mesmo integrantes atuais a conseguirem ler o código que ja foi construído. Além de que, o typescript tem um suporte bem melhor que o javascript para POO (levando em consideração a orientação a objetos da Barbara Liskov e não do Alan Kay), tendo: interfaces, classes abstratas, modificador de acesso como protected, override entre outras features que ajudam muito na hora de fazer um código orientado a objetos.

<br />

### Nest.js
Por ser um framework que ja possuo bastante experiência, acabei preferindo usar ele no lugar de fazer tudo com express e por ter ferramentas que definem um modelo arquitertural muito sólido.

Pelo fato do framework me proporcionar diversas facilidadem me ajudou muito a focar em coisas que podem gerar mais valor, tais como: testes unitários, testes de integração, documentação da API, dockerização da aplicação, padrões de projetos e etc.

<br />

### Modelo Arquitetural escolhido
Gosto de muito de seguir o modelo proposto por Uncle Bob no clean code, seguindo os principios de SOLID e etc (o clean arch estou lendo ainda).

Optei por não ficar colocando interface e contratos para tudo para não gastar muito tempo, sei que isso gera um acoplamento dentro do Serviço de Dominio da aplicação com libs e outras camadas, mas pelo tempo mesmo, acabei seguindo nessa linha para conseguir entregar o desafio 

<br />

### Testes
Em minha visão, testes é algo extremamente importante no desenvolvimento da aplicação, não só para garantir a qualidade do que é produzido, mas para gerar confiança nos desenvolvedores que irão mexer no código que eu produzi. Sendo assim, levei como um requisito básico o desenvolvimento de testes de integração e unitário para a aplicação. 

Algumas classes que estão no módulo shared, vão ser usadas pela aplicação inteira, deste modo, em algum momento elas precisariam ser extendidas ou modificadas, com os testes os desenvolvedores que vão mexer nessas classes tem código pronto para garantir que as mudanças não gerou ponto de quebra com quem usa a classe
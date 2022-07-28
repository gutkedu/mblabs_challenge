# Aplicação que gerencia um sistema de compra de ingressos para eventos

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/#/)
- [Express](https://expressjs.com/)
- [JsonWebToken](https://jwt.io/)
- [BcryptJs](https://www.npmjs.com/package/bcryptjs)
- [Stripe](https://www.npmjs.com/package/stripe)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Nodemailer](https://nodemailer.com/about/)
- [Docker](https://www.docker.com/)

## Rodando a aplicação

### Docker

```bash
$ docker compose up
```

### back-end

```bash
# Install the dependencies
$ npm i

# create .env file
FORGOT_MAIL_URL=http://localhost:3333/password/reset?token=
STRIPE_TEST_API_KEY="Stripe test api Key"
STRIPE_TEST_API_SECRET="Stripe test API secret"

#run database seeders:
npm run seed:costumer_role
npm run seed:admin_role
npm run seed:admin_user
```

## Testando as rotas da aplicação com o Insomnia

<div align="center">
<br>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=TicketsAPI&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fgutkedu%2Fmblabs_challenge%2Fmain%2F.insomnia%2Fexport.json)
</div>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

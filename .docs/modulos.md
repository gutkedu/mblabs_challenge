# Módulos da aplicação

## Account:

- [UserToken] POST /api/v1/login \
  `Login de usuário`
  >
- [UserToken] POST /api/v1/logout \
  `Logout de usuário`
  >
- [Public] POST /api/v1/password/forgot \
  `Envia email para recuperar senha`
  >
- [Public] POST /api/v1/password/reset \
  `Adiciona nova senha ao usuário`
  >
- [Public] POST /api/v1/users \
   `Cadastro (Sign up) de usuário`
  >
- [Admin] GET /api/v1/users/:id \
   `Informação do usuário com :id`
  >
- [Admin] GET /api/v1/users \
   `Informação sobre todos usuários (Index)`
  >
- [Admin] PUT /api/v1/users/:id \
   `Update de usuário`
  >
- [Admin] DELETE /api/v1/users/:id \
  `Remoção de usuário`
  >

## Tickets:

- [Public] GET /api/v1/tickets \
   `Recupera todos os tickets`
  >
- [Public] GET /api/v1/tickets/:id \
  `Recupera os detalhes sobre um ticket especifico`
  >
- [Admin] POST /api/v1/tickets \
  `Cria um ticket`
  >
- [Admin] PUT /api/v1/tickets/:id \
  `Realiza o update de um ticket`
  >
- [Admin] DELETE /api/v1/tickets/:id \
  `Deleta um ticket`
  >

## Orders:

- [UserToken] GET /api/v1/orders \
   `Recupera as ordens ativas para o usuário realizando a requisição`
  >
- [UserToken] GET /api/v1/orders/:id \
  `Detalhes sobre uma ordem especifica`
  >
- [UserToken] POST /api/v1/orders \
  `Cria uma ordem para comprar um ticket especifico`
  >
- [UserToken] DELETE /api/v1/orders/:id \
  `Cancela uma ordem especifica`
  >

## Payment:

- [UserToken] POST /api/v1/payments \
  `Cria uma ordem de compra para um serviço externo consumir, ex: Stripe`
  >

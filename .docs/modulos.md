# Módulos da aplicação

## Account:

- [Public] POST base_url/login \
  `Login de usuário`
  >
- [Public] POST base_url/refresh-token \
  `Gera novo token ao usuário a partir do seu refresh-token`
  >
- [Public] POST base_url/password/forgot \
  `Envia email para recuperar senha`
  >
- [Public] POST base_url/password/reset?token="id" \
  `Adiciona nova senha ao usuário`
  >
- [Public] POST base_url/users \
   `Cadastro (Sign up) de usuário`
  >
- [Admin] DELETE /api/v1/users/:id \
  `Remoção de usuário`
  >

## Tickets:

- [Public] GET base_url/tickets \
   `Recupera todos os tickets`
  >
- [Public] GET base_url/tickets/:id \
  `Recupera os detalhes sobre um ticket especifico`
  >
- [Admin] POST base_url/tickets \
  `Cria um ticket`
  >
- [Admin] DELETE base_url/tickets/:id \
  `Deleta um ticket`
  >

## Orders:

- [UserToken] POST base_url/orders \
  `Cria uma ordem para comprar um ou mais ingressos`
  >

## Payment:

- [UserToken] POST base_url/payment/method \
  `Cria uma opção de pagamento de cartão para um usuário logado na aplicação`
  >
- [UserToken] POST base_url/payment/intent \
  `Cria uma intenção de pagamento através do stripe utilizando a id da ordem de compra`
  >

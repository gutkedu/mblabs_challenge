# Requisitos do sistema

## Cadastro usuários

```
**RF**
- Deve ser possível cadastrar um usuário.

**RNF**
- Não deve ser possível cadastrar um usuário com email já existente.
```

## Recuperar senha

```
**RF**
- Deve ser possível recuperar a senha para o usuário informando o email.
- O usuário deve receber um email com o passo a passo para recuperar a senha.
- O usuário deve conseguir inserir uma nova senha.

**RNF**
- O usuário precisa informar uma nova senha.

```

## Listagem de ingressos

```
**RF**
- Deve ser possível buscar todos os ingressos cadastrados na plataforma.

**RNF**
- O usuário não precisa estar logado na aplicação
```

## Cadastro de ingressos

```
**RF**
- Deve ser possível cadastrar um novo ingresso na plataforma.

**RNF**
- O usuário responsável pelo cadastro deve ter privilégio de administrador.
- Não deve ser possível cadastrar ingressos com o mesmo nome de evento.
```

## Remoção e modificação de ingressos

```
**RF**
- Deve ser possível remover/modificar um ingresso cadastrado no sistema.

**RNF**
- O usuário responsável deve ter privilégio de administrador.
```

## Nova ordem de usuário

```
**RF**
- Deve ser possível realizar uma ordem de compra para um ingresso cadastrado na plataforma.

**RNF**
- O usuário precisa estar logado na aplicação.
```

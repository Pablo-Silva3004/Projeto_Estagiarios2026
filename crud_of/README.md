# API - Ordens de Fornecimento

Base URL: `http://localhost:8080`

> **Ordem recomendada para testes:** Perfis → Usuários → Status OF → Colaboradores → Ordens de Fornecimento → Histórico

---

## Perfis

### GET /perfis
Lista todos os perfis.

### GET /perfis/{id}
Busca um perfil pelo ID.

### POST /perfis
```json
{
  "nome": "ADMIN",
  "descricao": "Administrador do sistema"
}
```

### PUT /perfis/{id}
```json
{
  "nome": "ADMIN",
  "descricao": "Administrador com acesso total"
}
```

### DELETE /perfis/{id}
Sem corpo.

---

## Usuários

> Crie o perfil antes de criar um usuário.

### GET /usuarios
Lista todos os usuários.

### GET /usuarios/{id}
Busca um usuário pelo ID.

### POST /usuarios
```json
{
  "nome": "João Silva",
  "email": "joao.silva@empresa.com",
  "senha": "senha123",
  "cargo": "Analista de TI",
  "perfilId": 1
}
```

### PUT /usuarios/{id}
```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.silva@empresa.com",
  "senha": "novasenha456",
  "cargo": "Analista Sênior",
  "perfilId": 1
}
```

### DELETE /usuarios/{id}
Sem corpo.

---

## Colaboradores

> Crie pelo menos dois usuários (um para RT e um para Gerente) antes de criar um colaborador.

### GET /colaboradores
Lista todos os colaboradores.

### GET /colaboradores/{id}
Busca um colaborador pelo ID.

### POST /colaboradores
```json
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@empresa.com",
  "rtId": 1,
  "gerenteId": 2,
  "criadoPorId": 1
}
```

### PUT /colaboradores/{id}
> Não é possível alterar o `criadoPorId` na atualização.
```json
{
  "nome": "Maria Oliveira Atualizada",
  "email": "maria.oliveira@empresa.com",
  "rtId": 1,
  "gerenteId": 2
}
```

### DELETE /colaboradores/{id}
Sem corpo.

---

## Status OF

### GET /status-of
Lista todos os status.

### GET /status-of/{id}
Busca um status pelo ID.

### POST /status-of
> `ordem` define a sequência de exibição. `finalizador: true` indica que esse status encerra o fluxo da ordem.
```json
{
  "nome": "PENDENTE",
  "descricao": "Aguardando início",
  "ordem": 1,
  "finalizador": false
}
```

Outros exemplos para criar:
```json
{
  "nome": "EM_ANDAMENTO",
  "descricao": "Ordem em execução",
  "ordem": 2,
  "finalizador": false
}
```
```json
{
  "nome": "CONCLUIDO",
  "descricao": "Ordem finalizada",
  "ordem": 3,
  "finalizador": true
}
```

### PUT /status-of/{id}
```json
{
  "nome": "PENDENTE",
  "descricao": "Aguardando aprovação do gestor",
  "ordem": 1,
  "finalizador": false
}
```

### DELETE /status-of/{id}
Sem corpo.

---

## Ordens de Fornecimento

> Crie um colaborador e um status antes de criar uma ordem.

### GET /ordens-fornecimento
Lista todas as ordens.

### GET /ordens-fornecimento/{id}
Busca uma ordem pelo ID.

### POST /ordens-fornecimento
> `numeroOf` é opcional. `competenciaMes` deve ser entre 1 e 12.
```json
{
  "descricao": "Fornecimento de equipamentos de informática",
  "numeroOf": "OF-2026-001",
  "colaboradorId": 1,
  "statusId": 1,
  "competenciaMes": 5,
  "competenciaAno": 2026,
  "criadoPorId": 1
}
```

### PUT /ordens-fornecimento/{id}
> Só é possível atualizar a descrição e o status.
```json
{
  "descricao": "Fornecimento de equipamentos de informática - atualizado",
  "statusId": 2
}
```

### DELETE /ordens-fornecimento/{id}
Sem corpo.

---

## Histórico de Status OF

> Registra cada mudança de status de uma ordem. `statusAnteriorId` pode ser `null` no primeiro registro.

### GET /historico-status-of
Lista todo o histórico.

### GET /historico-status-of/{id}
Busca um registro pelo ID.

### POST /historico-status-of
```json
{
  "ordemId": 1,
  "statusAnteriorId": 1,
  "statusNovoId": 2,
  "alteradoPorId": 1,
  "observacao": "Iniciando processamento da ordem"
}
```

Exemplo de primeiro registro (sem status anterior):
```json
{
  "ordemId": 1,
  "statusAnteriorId": null,
  "statusNovoId": 1,
  "alteradoPorId": 1,
  "observacao": "Ordem criada no sistema"
}
```

---

## Códigos de resposta

| Código | Significado |
|--------|-------------|
| 200 | Sucesso (GET e PUT) |
| 201 | Criado com sucesso (POST) |
| 204 | Deletado com sucesso (DELETE) |
| 400 | Dados inválidos ou ID referenciado não existe |
| 404 | Registro não encontrado |

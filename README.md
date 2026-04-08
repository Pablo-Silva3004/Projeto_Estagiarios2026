# Projeto_Estagiarios2026


Este projeto tem como objetivo desenvolver um sistema para controle de Ordens de Fornecimento (OFs).

Uma OF pode ser entendida como uma tarefa mensal atribuída a um funcionário, funcionando como uma espécie de “pasta de trabalho” dentro do sistema.

Como o sistema funciona:

O sistema é baseado nos usuários que utilizam ele e nas ações que cada um pode realizar.

Administrador
- Possui controle total do sistema
- É o único que pode cadastrar:
    - Responsáveis Técnicos (RTs)
    - Gerentes

Responsável Técnico (RT)
- Atua como supervisor da equipe
- Pode cadastrar colaboradores (funcionários)
- É responsável por criar as OFs
- Define qual colaborador irá executar cada tarefa

Gerente
- Responsável por validar o trabalho
- Analisa as OFs
- Aprova quando estiverem finalizadas



Fluxo das OFs (Status):

Cada OF passa por três etapas principais:

Pendente
- A OF ainda não foi iniciada
- O colaborador ainda não recebeu sua tarefa

Iniciada
- A tarefa já começou
- Está em avaliação pelo gerente

Validada
- A tarefa foi concluída
- O gerente aprovou

Resultado do sistema:

O sistema substitui controles manuais (papel ou planilhas) e gera relatórios automaticamente.

Exemplo:

- Quantas OFs um colaborador possui
- Quantas estão pendentes
- Quantas foram iniciadas
- Quantas já foram validadas


Estrutura do projeto

backend → API em Spring Boot
frontend → telas do sistema (HTML/CSS no momento)

Como executar o backend

Entrar na pasta backend:

cd backend

Rodar o projeto:

./mvnw spring-boot:run

(No Windows usar mvnw.cmd)



Testar a API

Abrir no navegador:

http://localhost:8080/api/health



Swagger (documentação da API)

http://localhost:8080/swagger-ui.html




Sobre o projeto

Este sistema faz parte de um programa de estágio.

O objetivo não é apenas criar um sistema funcional, mas também:

- praticar programação
- aprender arquitetura de sistemas
- trabalhar em equipe
- entender como um sistema real é construído

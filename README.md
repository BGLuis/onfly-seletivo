<div align="center">

![TypeScript][TypeScript.io]
![n8n][n8n.io]
![Docker][Docker.io]
![PostgreSQL][PostgreSQL.io]

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]

  <a href="https://github.com/bgluis/onfly-seletivo/">
    <img src="docs/imgs/image.png" alt="Logo" width="250" height="100">
  </a>

  <h3>Onfly: Seletivo</h3>
  custom nodes n8n
</div>

# 📖 Sobre

Um node personalizado para n8n que gera um numero aleatorio que é gerado apartir da api da [random.org](https://www.random.org/)

# 📋 Motivo

Esse Projeto existe como parte do processo seletivo da [onfly](https://www.onfly.com.br)

# ⚙️ Funcionalidades do Node

**Nome do node**: Random

**Operação**: True Random Number Generator

**Inputs**:

-   **Min**: O valor mínimo do intervalo (inteiro, inclusivo).

-   **Max**: O valor máximo do intervalo (inteiro, inclusivo).

-   **Output**: Retorna um campo randomNumber com o valor gerado, mesclado com os dados de entrada.

# 💻 Como iniciar

# Configurar e Iniciar o Ambiente n8n

1. Clonar o Repositório:<br/>

    - git clone git@github.com:BGLuis/onfly-seletivo.git n8n-dev-environment
      cd n8n-dev-environment

2. Configurar Variáveis de Ambiente (Opcional):<br/>
   O docker compose não precisa de pré-configuração, mas pode evitar colisões de portas
    - Crie um arquivo `.env` na raiz do projeto, copiando o exemplo `.env.example`
    - Preencha com os valores válidos conforme a tabela abaixo:

| Categoria      | Variável                  | Tipo      | Valores Válidos                                                                 | Padrão                   | Descrição                  |
| -------------- | ------------------------- | --------- | ------------------------------------------------------------------------------- | ------------------------ | -------------------------- |
| **PostgreSQL** | `POSTGRES_DB`             | `string`  | Qualquer nome válido de DB                                                      | `n8n`                    | Nome do banco de dados     |
|                | `POSTGRES_USER`           | `string`  | Qualquer nome de usuário                                                        | `n8n`                    | Usuário do PostgreSQL      |
|                | `POSTGRES_PASSWORD`       | `string`  | Qualquer senha segura                                                           | `n8n_password`           | Senha do PostgreSQL        |
|                | `POSTGRES_HOST`           | `string`  | Nome do host/IP                                                                 | `postgres`               | Host do PostgreSQL         |
|                | `POSTGRES_PORT`           | `number`  | `1024-65535`                                                                    | `5432`                   | Porta do PostgreSQL        |
| **n8n App**    | `DB_TYPE`                 | `string`  | `postgresdb`, `mysql`, `sqlite`                                                 | `postgresdb`             | Tipo do banco de dados     |
|                | `N8N_BASIC_AUTH_ACTIVE`   | `boolean` | `true`, `false`                                                                 | `true`                   | Ativar autenticação básica |
|                | `N8N_BASIC_AUTH_USER`     | `string`  | Email válido                                                                    | `admin@admin.com`        | Email de login             |
|                | `N8N_BASIC_AUTH_PASSWORD` | `string`  | Qualquer senha                                                                  | `admin123`               | Senha de acesso            |
|                | `WEBHOOK_URL`             | `string`  | URL válida                                                                      | `http://localhost:5678/` | URL base para webhooks     |
|                | `GENERIC_TIMEZONE`        | `string`  | [Timezone válido](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | `America/Sao_Paulo`      | Fuso horário               |
|                | `N8N_PORT`                | `number`  | `1024-65535`                                                                    | `5678`                   | Porta da aplicação n8n     |

### Exemplo de configuração:

```bash
# PostgreSQL
POSTGRES_DB=meu_n8n
POSTGRES_USER=usuario_db
POSTGRES_PASSWORD=senha_super_segura
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# n8n App
DB_TYPE=postgresdb
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=meu_email@dominio.com
N8N_BASIC_AUTH_PASSWORD=minha_senha_segura
WEBHOOK_URL=http://localhost:8080/
GENERIC_TIMEZONE=America/Sao_Paulo
N8N_PORT=8080
```

3. Iniciar o Ambiente:<br/>

    ```bash
    docker compose -f docker-composer.yml up -d
    ```

4. Acessar a Aplicação:<br/>

    - Abra o navegador em: `http://localhost:5678` (ou a porta configurada em `N8N_PORT`)
    - Use as credenciais configuradas em `N8N_BASIC_AUTH_USER` e `N8N_BASIC_AUTH_PASSWORD`

5. Recompilar o Node Customizado (quando necessário):<br/>
    ```bash
    docker compose -f docker-composer.yml up -d build-custom-nodes
    ```

# 🧪 Testes

1. Acesse sua instância do n8n

2. Crie um novo fluxo de trabalho.

3. Clique no botão + para adicionar um novo nó.

4. Na barra de busca, digite "Random". O seu nó personalizado deve aparecer.

5. Adicione o nó ao canvas.

6. Configure os campos "Min" e "Max" com os valores desejados.

7. Execute o fluxo de trabalho para ver o número aleatório gerado na saída

# 🤝 Contribuidores

 <a href = "https://github.com/bgluis/onfly-seletivo/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/onfly-seletivo"/>
 </a>

[repossitory-path]: bgluis/onfly-seletivo/
[contributors-shield]: https://img.shields.io/github/contributors/bgluis/onfly-seletivo.svg?style=for-the-badge
[contributors-url]: https://github.com/bgluis/onfly-seletivo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bgluis/onfly-seletivo.svg?style=for-the-badge
[forks-url]: https://github.com/bgluis/onfly-seletivo/network/members
[stars-shield]: https://img.shields.io/github/stars/bgluis/onfly-seletivo.svg?style=for-the-badge
[stars-url]: https://github.com/bgluis/onfly-seletivo/stargazers
[issues-shield]: https://img.shields.io/github/issues/bgluis/onfly-seletivo.svg?style=for-the-badge
[issues-url]: https://github.com/bgluis/onfly-seletivo/issues
[license-shield]: https://img.shields.io/github/license/bgluis/onfly-seletivo.svg?style=for-the-badge
[license-url]: https://github.com/bgluis/onfly-seletivo/blob/master/LICENSE.txt

 <!-- Links -->
 <!-- https://github.com/iuricode/readme-template-->

[TypeScript.io]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[n8n.io]: https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white
[Docker.io]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[PostgreSQL.io]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white

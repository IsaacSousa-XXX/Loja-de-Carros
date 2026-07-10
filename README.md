# King of Cars - Sistema de Controle de Estoque

Sistema web completo para gestão de estoque de veículos, desenvolvido como projeto avaliativo da disciplina de Programação II. O sistema permite o cadastro, listagem, consulta, edição e exclusão de veículos, com uma interface responsiva e segura.

## 🚀 Funcionalidades Principais
* **Autenticação**: Acesso restrito ao painel administrativo via sistema de Login.
* **Gestão de Estoque (CRUD Completo)**:
  * **Cadastro**: Inclusão de novos veículos com suporte a upload de imagem em tempo real (Base64).
  * **Listagem**: Visualização de todos os veículos cadastrados no sistema.
  * **Consulta**: Detalhamento individual de cada veículo.
  * **Edição**: Atualização de informações de veículos existentes.
  * **Exclusão**: Remoção definitiva de registros do estoque.
* **Responsividade**: Interface adaptável a diferentes resoluções de tela utilizando Tailwind CSS.

## 🛠️ Tecnologias Utilizadas
* **Front-end**: Angular, TypeScript, Tailwind CSS.
* **Back-end**: PHP.
* **Banco de Dados**: MySQL.

## ⚙️ Como Executar a Aplicação

### Pré-requisitos
* XAMPP (ou servidor compatível com PHP e MySQL) instalado.
* Node.js e Angular CLI instalados.
* Git.

### Configuração do Banco de Dados
1. Inicie o MySQL no seu XAMPP.
2. Acesse o `phpMyAdmin` e crie um banco de dados vazio (recomendado nome: `king_of_cars`).
3. Importe o arquivo `dump.sql` localizado na raiz deste projeto.
4. Certifique-se de que o `max_allowed_packet` do seu MySQL esteja configurado para `64M` no arquivo `my.ini` para permitir o upload de imagens.

### Executando o Back-end
1. No seu terminal, navegue até a pasta onde está o back-end (PHP).
2. Execute o comando para iniciar o servidor embutido do PHP:
   ```bash
   php -S localhost:8000 

Obs: Se php -S localhost:8000 não funcionar, rode: C:\xampp\php\php.exe -S localhost:8000


### Executando o Front-end
1. No terminal, navegue até a pasta do `frontend`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `ng serve`.
4. Acesse o sistema em: `http://localhost:4200`.

## 📡 Endpoints da API

| Método | Rota | Finalidade |
| :--- | :--- | :--- |
| **GET** | `/listar_veiculos.php` | Lista todos os veículos cadastrados |
| **GET** | `/buscar_veiculo.php?id={id}` | Recupera um único registro |
| **POST** | `/salvar_veiculo.php` | Cadastra um novo veículo |
| **POST** | `/editar_veiculo.php` | Atualiza um veículo existente |
| **POST** | `/excluir_veiculo.php` | Exclui um veículo pelo ID |

*Exemplo de requisição (POST `/salvar_veiculo.php`):*
```json
{
  "modelo": "CBX 250 Twister",
  "marca": "Honda",
  "ano": 2005,
  "preco": 8250.00
}

🌐 URLs do Sistema
Sistema: http://localhost:4200

API: http://localhost:8000 (ajuste conforme a porta do seu servidor local)
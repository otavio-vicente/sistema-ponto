# Sistema de Ponto Completo

Este projeto é um sistema completo de registro de ponto desenvolvido para facilitar o controle de horários de entrada e saída dos funcionários em uma empresa. Foi pensado para ser simples, eficiente e fácil de usar, tanto para os colaboradores quanto para os administradores.

## Tecnologias Utilizadas
- Backend: Node.js com Express, para construção da API RESTful e manipulação dos dados no servidor.
- Banco de Dados: MySQL, para armazenamento seguro e estruturado das informações dos funcionários e registros de ponto.
- Frontend: HTML5, CSS3 (com Bootstrap para responsividade e estilização), e JavaScript para interação dinâmica.
- Outros: Gerenciamento de sessões, geração de relatórios em PDF, validações e segurança básica.

## Funcionalidades Principais
- Cadastro e gerenciamento de funcionários com diferentes perfis (administrador e funcionário).
- Registro manual de horários de entrada e saída, com seleção de horários pré-definidos.
- Emissão de relatórios em PDF para acompanhamento diário dos registros.
- Interface responsiva e amigável, adequada para uso em desktops e dispositivos móveis.

## Configuração e Execução
O backend roda no localhost:3000 por padrão.

Para conectar ao banco de dados MySQL, é necessário configurar o arquivo .env na pasta backend com as credenciais corretas do seu MySQL Workbench (usuário, senha, host, etc.).

## Como incorporar o arquivo do Banco de Dados no MySQL Workbench
O arquivo sistema_ponto.sql está incluso neste repositório e já contém:
- O comando CREATE DATABASE
- As estruturas de tabelas
- Dados populados nas tabelas funcionarios e registros

Passo a Passo no MySQL Workbench:
- Abra o MySQL Workbench e conecte-se ao seu servidor local (ex: localhost).
- No menu superior, vá em Server > Data Import.
- Em Import Options, selecione:
  Import from Self-Contained File
  Escolha o caminho do arquivo: sistema_ponto.sql
- Em Default Target Schema:
  Selecione sistema_ponto, caso já exista.
  Ou marque a opção Create New Schema e ele criará automaticamente.
- Clique no botão Start Import no canto inferior direito.
- Após a finalização, vá na aba Schemas → clique com o botão direito → Refresh All.

Verifique se o schema sistema_ponto está disponível com as tabelas:
- funcionarios
- registros

Exemplo do .env:
```bash
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_HOST=localhost
DB_NAME=nome_do_banco
```

## Como Executar o Sistema CORRETAMENTE

Terminal:
```bash
cd backend
npm run start:dev
```
Por que dessa forma?
O comando npm run start:dev deve ser executado DENTRO da pasta backend porque:
- O arquivo package.json com os scripts está dentro da pasta backend
- As configurações do servidor Node.js/Express estão nessa pasta
- O arquivo .env precisa estar no mesmo diretório para carregar as variáveis de ambiente corretamente

Solução de Problemas Comuns
Se aparecer o erro:
```bash
Error: Cannot find module 'C:\caminho\errado\server.js'
```
Significa que você está executando o comando da pasta errada. Corrija com:

# Certifique-se de estar NA PASTA BACKEND
```bash
cd C:\caminho\para\sistema-ponto-completo\backend
npm run start:dev
```

## Dica Importante

Configure seu VS Code para abrir os terminais já nas pastas corretas:

Clique com o botão direito na pasta backend no explorador do VS Code

Selecione "Abrir no Terminal Integrado"

Execute npm run start:dev nesse terminal

Isso garante que o servidor Node.js será iniciado no contexto correto, com todas as dependências e configurações disponíveis.

## Exemplo para testes de login:
Matrícula ADM: 000 | 
Senha: 123 <br>
Matrícula Funcionário: 001 | 
Senha: 12345<br>

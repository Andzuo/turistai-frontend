# Turistai

![Projeto](./src/components/assets/print%201.PNG)

## Descrição

**Turistai** é um aplicativo desenvolvido com Spring e React que permite aos usuários criar e gerenciar viagens, criar roteiros das suas viagens, marcar os lugares que você pode visitar. O aplicativo utiliza MaterialUI como auxiliar na criação de coponenents, PostgresSQL como banco de dados e oferece visualização das suas viagens em formato de agenda.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Funcionalidades

- **Criação de Viagens**: Permite ao usuário criar uma nova viagem e visualizá-la em formato de agenda.
- **Criação de Roteiros**: Adicione roteiros detalhados dentro de cada viagem.
- **Gerenciamento de Roadmaps**: Adicione imagens, títulos e endereço dos lugares no para seu roadmap.
- **Upload de Imagens**: Possibilita o upload de imagens através de um endpoint dedicado.
- **Visualização**: Exibe uma lista de viagens com opções de remoção e visualização detalhada.
- **Autenticação**: Utiliza JWT para proteger endpoints e autenticar usuários.

## Tecnologias

- **Backend**: Spring Framework, JWT, Docker, PostgreSQL
- **Frontend**: React, Axios, Material-UI, react-router-dom
- **Armazenamento de Arquivos**: Configuração personalizada para upload e armazenamento de imagens.

## Estrutura do Projeto

### Backend

- **Travel**: Classe principal para criar e gerenciar viagens.
- **FileStorageProperties**: Configura o diretório de upload de arquivos.
- **TokenController**: controller para os endPoints de autenticação e encodificador do código de acesso
- **travelController**: controller que gerencia todos os endpoints que envolvem a classe travel, 
- **UserController**: Controller que gerencia o cadastro de novos usuarios
- **TravelRoadMapController**: controller que gerencia todos os endpoints que envolvem a classe TravelRoadMap
- **Banco de Dados**: PostgreSQL para armazenamento de dados.
- **Docker**: O backend está configurado para rodar em contêineres Docker para facilidade no versionamento e manutenção.

### Frontend

- **RoadMapList**: Componente para listar e visualizar roadmaps.
- **SelectTravelModal**: Modal para exibir detalhes da viagem e permitir remoção.
- **RoadMapTravelModal**: Modal para gerenciamento de roadmaps.
- **CreateTravelModal**: Modal para criar novas viagens.
- **TravelsList**: Componente para listar viagens em um grid de 3 por linha.

## Instalação

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/andzuo/turistai-backend.git
   ```

3. Navegue até o diretório do projeto:
   ```bash
   cd turistai-backend
   ```

4. Construa e execute os contêineres Docker:
   ```bash
   docker-compose up --build -d
   ```

### Frontend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/turistai-frontend.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd turistai-frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o aplicativo:
   ```bash
   npm start
   ```

## Configuração

- **Backend**: Configure o diretório de upload de arquivos em `application.properties` o padrão está programado para o diretorio /app/uploads dentro do container docker, porem, você pode alterar e a conexão com o banco de dados PostgreSQL.
- **Frontend**: Configure a URL da API no arquivo de configuração do Axios.

## Contribuição

Se você deseja contribuir para o projeto, por favor siga estas etapas:

1. Fork o repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça suas alterações e commit (`git commit -am 'Adicionar nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

#### Possiveis melhorias

- edit de viagens 
- atualização da lista ao criar novos components no front-end 
- adicionar placesAPI para facilitar o cadastro de lugares.

## Contato

Para mais informações, entre em contato com [alucasm02@gmail.com](mailto:alucasm02@gmail.com).

---

Se precisar de mais ajustes ou adicionar algo, é só avisar!
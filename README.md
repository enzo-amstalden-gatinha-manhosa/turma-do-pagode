# 🐾 Sistema de Adoção – API REST com Node.js

API REST desenvolvida para gerenciar o processo de adoção de animais, incluindo cadastro de tutores, questionários, pedidos de adoção, gerenciamento de animais e apoio à ONG.  

---

## 👥 Integrantes do Grupo
- Luca Miguel Peres Bizinotto
- Luis Ricardo de Moraes Torres
- Enzo de Almeida Amstalden
- Gabriel Rodrigues de Melo Silva
- Gustavo Rodrigues Paulino

**Turma:** 2°DS- mtec

---

## 🚀 Tecnologias Utilizadas
- Node.js  
- Express.js  
- Sequelize  
- SQLite
- EncryptJS (criptografia de senhas)  

---

## 🔧 Regras do Projeto
- Todas as tabelas devem conter os campos `createdAt` e `updatedAt`.  
- Senhas devem ser criptografadas no banco de dados.  
- Seeds iniciais devem cadastrar usuários administradores.  
- Endpoints administrativos devem ser protegidos por autorização.  

---

## 📌 Funcionalidades Principais
1. **Cadastro de Animal**  
   - POST `/animais`  
   - Campos: nome, espécie, porte, castrado, vacinado, descrição, foto (buffer)  

2. **Cadastro de Tutor**  
   - POST `/usuario`  
   - POST `/questionario`  

3. **Listagem de Animais**  
   - GET `/animais`  

4. **Pedidos de Adoção**  
   - POST `/adocoes`  

5. **Atualização de Tutor**  
   - PATCH `/tutores/:id`  

6. **Gerenciamento Administrativo**  
   - GET `/admin/animais`  
   - PATCH `/admin/animais/:id`  
   - DELETE `/admin/animais/:id`  
   - GET `/animais/:id`  

7. **Detalhes de Tutor**  
   - GET `/tutores/:id`  

8. **Autenticação**  
   - POST `/autenticacao`  

9. **Doações**  
   - POST `/doacoes`  

---

## ⚡ Exemplos de Respostas
**Cadastro de Animal – Sucesso**
```json
{
  "id": "uuid",
  "nome": "Rex",
  "especie": "Cachorro",
  "porte": "Médio",
  "castrado": true,
  "vacinado": true,
  "descricao": "Cão dócil e brincalhão",
  "foto": "Buffer"
}
```

**Erro – Cadastro de Animal**
```json
{
  "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."
}
```

---

## 📂 Estrutura do Projeto
```
turma-do-pagode/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   └── utils/
├── .gitignore
├── app.js
├── database.sqlite
├── package-lock.json
├── package.json
└── README.md

```

---

## 📦 Como Executar o Projeto
1. Clonar o repositório:  
   ```bash
   git clone https://github.com/enzo-amstalden-gatinha-manhosa/turma-do-pagode
   cd turma-do-pagode
   ```

2. Instalar dependências:  
   ```bash
   npm install
   ```

3. Rodar migrations e seeds:  
   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

4. Iniciar servidor:  
   ```bash
   npm start
   ```

5. Acessar:  
   [http://localhost:3000](http://localhost:3000)  

---

Copyright @turma-do-pagode

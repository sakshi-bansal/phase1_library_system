# Library Assignment
Manage your library and view your favorite books and authors. 

## Local Setup
1. **Clone repository**

   ```bash
   git clone https://github.com/sakshi-bansal/phase1_library_system
   cd phase1_library_system
   ```

2. **Environment Setup**

   ```bash
   touch .env

   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=library
   DB_USERNAME=username
   DB_PASSWORD=password
   ```

3. **Install Dependencies**

   ```bash
   npm install sequelize sequelize-cli dotenv-cli pg pg-hstore @types/pg
   npm install graphql @apollo/server @as-integrations/next
   npm install @apollo/client@latest @apollo/client-integration-nextjs
   ```

4. **Database Setup**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Navigate 
	```
	Visit [http://localhost:3000](http://localhost:3000)
	```

## Demo Video
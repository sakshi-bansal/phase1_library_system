# Library Assignment
Discover and manage your favorite books.

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
   npm install
   ```

5. **Database Setup**
   
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

7. **Start Development Server**
   
   ```bash
   npm run dev
   ```

## Demo Video
   Deployed [here](https://phase1-library-system.vercel.app/)
   
   Recording [here](https://drive.google.com/file/d/1foT92qvInpTxaXf2IfQch2mtys8q3aQ0/view?usp=drive_link)
  

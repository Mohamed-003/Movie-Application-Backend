# Movie-Application-Backend

Welcome to the Movie Application! This application allows users to register, log in, and manage their movie list. It consists of both frontend and backend components.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Movie Application is a web-based platform where users can manage their movie collections. It provides features for user registration, login, and CRUD operations on a movie list, including adding, deleting, and editing movie details. The movie details include the movie name, cast, genre, and rating.

## Features

- User Registration: Users can create an account to access the application.
- User Login: Registered users can log in to the application.
- Movie Management:
  - Add Movie: Users can add movies to their list with details such as name, cast, genre, and rating.
  - Delete Movie: Users can remove movies from their list.
  - Edit Movie: Users can update movie details, including name, cast, genre, and rating.
- Data Storage: Movie details are stored in a PostgreSQL database, ensuring persistence across sessions.

## Technologies

### Frontend

- HTML
- CSS
- JavaScript
- Bootstrap CSS

### Backend

- Node.js
- Express.js
- Bcrypt (for password hashing)
- CORS (Cross-Origin Resource Sharing)
- JSON Web Tokens (JWT) for authentication
- Nodemon (for automatic server restart)
- PostgreSQL (as the database)

## Installation

To run the Movie Application on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-application.git


1.Install the required dependencies for both the frontend and backend:

# Go to the frontend directory

cd movie-application-frontend



# Go to the backend directory
cd ../movie-application-backend
npm install


2.Set up the database: See Database Setup for instructions.

Start the backend server:

# In the backend directory
npm start

Start the frontend development server:

# In the frontend directory
start register.html

Access the application in your web browser at http://localhost:3000.

### Installing PostgreSQL on Windows

1. Download PostgreSQL: 
   - Visit the [EDB PostgreSQL download page](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
   - Choose the newest Windows version compatible with your operating system.
   - Download the installer for your system.

2. Start the Installation:
   - Once the download is complete, locate the downloaded file and double-click it to start the installation process.

3. Specify Directory:
   - You can specify the installation location for PostgreSQL. The default location is fine for most users. Click "Next" to continue.

4. Select Components:
   - You'll need to install the PostgreSQL Server for using PostgreSQL. Additionally, consider installing the pgAdmin 4 component and Command Line Tools if you want to use them. Select these components and click "Next."

5. Storage Directory:
   - You can choose where to store the database data. The default choice is usually suitable for local installations. Click "Next" to proceed.

6. Set Password:
   - Select a password that you'll use to access the PostgreSQL database. For a local database with no incoming connections, you can choose a secure password. Click "Next" when you've set your password.

7. Select Port:
   - You can set the port on which the PostgreSQL server should listen. The default choice is typically preferred for most users. Click "Next."

8. Select Locale:
   - Select the geographically location for the database server. Choose the locale that best matches your location.

9. Final Check:
   - Review the installation settings to ensure they are correct. If everything looks fine, click "Next" to proceed.

10. Start Installation:
   - Click "Next" to begin the installation process.

11. Installing:
    - Wait for the installation to complete. This might take a few moments.

12. Complete:
    - Once the installation is finished, you have successfully installed PostgreSQL on your Windows computer.

### Setup Prisma

1. Create a project directory and navigate into it:

    ```shell
    mkdir hello-prisma
    cd hello-prisma
    ```

2. Initialize a Node.js project and add the Prisma CLI as a development dependency:

    ```shell
    npm init -y
    npm install prisma --save-dev
    ```

   This will create a `package.json` with an initial setup for a Node.js app.

3. You can now invoke the Prisma CLI by prefixing it with `npx`:

    ```shell
    npx prisma
    ```

4. Set up your Prisma project by creating your Prisma schema file with the following command:

    ```shell
    npx prisma init
    ```

   This command does two things:

   - Creates a new directory called `prisma` that contains a file called `schema.prisma`, which contains the Prisma schema with your database connection variable and schema models.
   - Creates the `.env` file in the root directory of the project, which is used for defining environment variables (such as your database connection).

5. Connect your database by setting the `url` field of the `datasource` block in your Prisma schema to your database connection URL. Edit `prisma/schema.prisma`:

    ```prisma
    datasource db {
      provider = "postgresql"
      url = env("DATABASE_URL")
    }
    ```

   In this case, the `url` is set via an environment variable which is defined in `.env`.

6. Define your database connection URL in `.env`:

    ```
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    ```

   

7. Adjust the connection URL to point to your own database. The format of the connection URL for your database depends on the database you use.

   - For PostgreSQL, it typically looks like this:

     ```
     postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
     ```
8. Now you are ready to create your database schema using Prisma Migrate. Add the following Prisma data model to your Prisma schema in `prisma/schema.prisma`:

    ```prisma
  model List {
  id           Int      @id @default(autoincrement())
  movieName    String
  rating       Int
  cast         String[]
  genre        String
  releaseDate  DateTime @default(now())
  author       User     @relation(fields: [authorId], references: [id])
  authorId     Int
 }

 model User {
  id        Int     @id @default(autoincrement()) 
  email     String  @unique
  password  String  
  movieList List[]   
 }
    ```

9. To map your data model to the database schema, you need to use the Prisma Migrate CLI commands:

    ```shell
    npx prisma migrate dev --name init
    ```

   This command does two things:

   - Creates a new SQL migration file for this migration.
   - Runs the SQL migration file against the database.

   Great! You have now created three tables in your database with Prisma Migrate.

10. Install and generate the Prisma Client by running the following command:

    ```shell
    npm install @prisma/client
    ```

   The `install` command invokes `prisma generate` for you, which reads your Prisma schema and generates a version of Prisma Client tailored to your models.

11. Whenever you update your Prisma schema, you will need to update your database schema using either `prisma migrate dev` or `prisma db push`. This will keep your database schema in sync with your Prisma schema. The commands will also regenerate Prisma Client.

12. Now the data from the Data base can be easily queried


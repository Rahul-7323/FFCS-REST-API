<h1 align="center" style="color: cyan">FFCS REST API 📊🚀✨</h1>

<!-- ABOUT THE PROJECT -->

## About The Project

![screenshot](images/screenshot.png)

`FFCS REST API` is a REST API that implements the Fully Flexible Credit System of VIT where students can register for courses for a semester by choosing the faculties and slots according to their convenience.

The following features are implemented:

- Administrators and students can login using their credentials after which a JWT token is generated that can be used to access protected resources.
- Administrators can add faculties, slots, students and courses.
- Students can register for a course by providing the course id, faculty id and slot ids.
- Course registration is successful only if the provided data is valid, i.e if the course is valid, if the faculty is valid, if there are no clashes of the given slots with the registered slots and so on.
- Students can get the timetable containing details of all the registered courses and their slots.

### Built With

- TypeScript
- PostgreSQL - Relational database for storing the data.
- Prisma - An ORM (Object-Relational Mapping) framework for node.js and TypeScript to map relational database tables to data models (objects).
- Express - A node.js web application framework for building backend apps.
- Bcrypt - A hashing library for hashing passwords.
- Jsonwebtoken - A library for creating JSON web tokens.

<!-- GETTING STARTED -->

## Getting Started

1. Clone the repository and move to that folder.
   ```bash
   git clone https://github.com/dyte-submissions/vit-hiring-2023-phase-1-Rahul-7323.git
   cd vit-hiring-2023-phase-1-Rahul-7323
   ```
2. Copy the contents of `.env.example` file to `.env` file.
   ```bash
   cat .env.example > .env
   ```
3. Replace the `username`, `password`, `host`, `port` and `database` with our own values.
   ```diff
   - DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
   + DATABASE_URL="postgresql://postgres:password@localhost:5432/ffcs?schema=public"
   PORT=3000
   BCRYPT_PASSWORD_SALT=7
   JWT_SECRET=dontsharepls
   ```
4. Install the packages.
   ```bash
   npm install
   ```
5. Create the tables in PostgreSQL for the data models given in `prisma/schema.prisma` by running the below command.
   ```bash
   npx prisma migrate deploy
   ```
   output:
   ![prisma_migrate_deploy_output](images/prisma_migrate_deploy_output.png)
6. Start the server. On starting the server, you will get JWT tokens for Admin and Student that can be used for the test suite.
   ```bash
   npm run dev
   ```
   output:
   ![npm_run_dev_output](images/npm_run_dev_output.png)
7. Open a new terminal window and clone the below repository for the test suite. This repository is a fork of dyte's official test suite for this API. I have simply fixed the errors that occured due to request body and headers, nothing else has been changed. After cloning, move to that folder.
   ```bash
   git clone https://github.com/Rahul-7323/vit-hiring-2023-phase1-test.git
   cd vit-hiring-2023-phase1-test
   ```
8. Replace the `TOKEN` in `ADMIN_AUTH_TOKEN` and `STUDENT_AUTH_TOKEN` in main.py with `Admin Token` and `Student Token` that we got previously. Please note that the prefix `Bearer` is present in the authorization header as per norms and is NOT part of the token, the server will extract the token alone from the header automatically.

   ```diff
   - ADMIN_AUTH_TOKEN = 'Bearer TOKEN'
   - STUDENT_AUTH_TOKEN = 'Bearer TOKEN'

   + ADMIN_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMDA3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MDM0ODU3fQ.rztT9cjFOtX_bmWmMsndy8sFskou3whp1Iv_AROOmqw'

   + STUDENT_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwQlJTMTEyMSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjc4MDM0ODU3fQ.WbNmC5cXdTYOuaZvzyQjGsNU-dQaa7uRxUh15zJRorA'
   ```

9. Create a virtual environment and activate it.

   ```bash
   python3 -m venv venv

   source ./venv/bin/activate # For Linux

   . .\venv\Scripts\Activate.ps1 # For Windows
   ```

10. Install the required packages from `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```
11. Run the test suite and verify that the REST API is working as expected.
    ```bash
    python3 main.py
    ```
    output (the timetable part alone):
    ![test_suite_output](images/test_suite_output.png)

## ER Diagram

(generated from the prisma schema using prisma-erd-generator)
![ERD](images/ERD.png)

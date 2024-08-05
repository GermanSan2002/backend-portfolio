# Backend Portfolio

This is a backend portfolio project built with NestJS. It provides functionalities for managing authentication, user data, projects, and skills.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization.
- CRUD operations for user profiles, projects, and skills.
- Secure password management.
- Error handling and management.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/backend-portfolio.git
    cd backend-portfolio
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your environment variables. Example:
    ```env
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_DATABASE=your_db_database

    PORT=your_port
    NODE_ENV=your_node_env

    # BCRYPT
    HASH_SALT_ROUNDS=your_salt_rounds

    # JWT
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=your_jwt_expires_in

    # FIREBASE
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    ```

## Running the Application

1. **Start the application**:
    ```sh
    npm run start
    ```

2. **Start the application in development mode**:
    ```sh
    npm run start:dev
    ```

3. **Run end-to-end tests**:
    ```sh
    npm run test:e2e
    ```

## Folder Structure

```plaintext
backend-portfolio/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── common/
│   │   ├── decorators/
│   │   └── interfaces/
│   ├── constants/
│   ├── database/
│   ├── firebase/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   ├── projects/
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.module.ts
│   │   │   ├── projects.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   ├── skills/
│   │   │   ├── skills.controller.ts
│   │   │   ├── skills.module.ts
│   │   │   ├── skills.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.module.ts
│   │       ├── user.service.ts
│   │       ├── dto/
│   │       └── entities/
│   ├── utils/
│   │   ├── error.manager.ts
│   │   └── password/
│   │       └── index.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── profile.json
├── tsconfig.build.json
└── tsconfig.json
```

## Usage

### Authentication

#### Register
- **Endpoint**: `POST /auth/register`
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "id": "string",
        "username": "string",
        "email": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```

#### Login
- **Endpoint**: `POST /auth/login`
- **Description**: Logs in an existing user.
- **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "accessToken": "string"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

### Users

#### Get User Profile
- **Endpoint**: `GET /user/profile`
- **Description**: Retrieves the profile of the logged-in user.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "id": "string",
        "username": "string",
        "email": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Update User Profile
- **Endpoint**: `PUT /user/profile`
- **Description**: Updates the profile of the logged-in user.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Request Body**:
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "id": "string",
        "username": "string",
        "email": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

### Projects

#### Create Project
- **Endpoint**: `POST /projects`
- **Description**: Creates a new project.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Request Body**:
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Get Projects
- **Endpoint**: `GET /projects`
- **Description**: Retrieves all projects.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "createdAt": "string",
          "updatedAt": "string"
        }
      ]
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message":

 "Unauthorized"
      }
      ```

#### Update Project
- **Endpoint**: `PUT /projects/:id`
- **Description**: Updates an existing project.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Request Body**:
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Delete Project
- **Endpoint**: `DELETE /projects/:id`
- **Description**: Deletes an existing project.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Project deleted successfully"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "statusCode": 404,
        "message": "Project not found",
        "error": "Not Found"
      }
      ```

### Skills

#### Create Skill
- **Endpoint**: `POST /skills`
- **Description**: Creates a new skill.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Request Body**:
    ```json
    {
      "name": "string",
      "level": "number"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "id": "string",
        "name": "string",
        "level": "number",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Get Skills
- **Endpoint**: `GET /skills`
- **Description**: Retrieves all skills.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "id": "string",
          "name": "string",
          "level": "number",
          "createdAt": "string",
          "updatedAt": "string"
        }
      ]
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Update Skill
- **Endpoint**: `PUT /skills/:id`
- **Description**: Updates an existing skill.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Request Body**:
    ```json
    {
      "name": "string",
      "level": "number"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "id": "string",
        "name": "string",
        "level": "number",
        "createdAt": "string",
        "updatedAt": "string"
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "statusCode": 400,
        "message": "Validation error details",
        "error": "Bad Request"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```

#### Delete Skill
- **Endpoint**: `DELETE /skills/:id`
- **Description**: Deletes an existing skill.
- **Headers**:
    ```json
    {
      "Authorization": "Bearer <accessToken>"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Skill deleted successfully"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "statusCode": 404,
        "message": "Skill not found",
        "error": "Not Found"
      }
      ```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
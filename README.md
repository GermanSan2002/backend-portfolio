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
- [Token Refresh Handling](#token-refresh-handling)

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
│
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── common/
│   ├── modules/
│   ├── database/
│   └── ...
├── test/
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

## Usage

This section would typically include details about the API endpoints, how to interact with the backend, and any specific instructions or examples.

## Token Refresh Handling

### Authentication and Token Issuance
When a user logs in, they receive both an access token and a refresh token. The access token has a limited lifespan, while the refresh token is used to obtain a new access token without needing to re-enter credentials.

**Login Endpoint:**
```typescript
async loginUsuario(
  credentialsDTO: CredentialsDTO,
): Promise<{ accessToken: string; refreshToken: string }> {
  const { email, password } = credentialsDTO;
  const user = await this.userRepository.findOneBy({ email });
  if (!user) {
    throw new NotFoundException('Invalid email or password');
  }

  const isPasswordValid = await this.authService.comparePassword(
    password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new NotFoundException('Invalid email or password');
  }

  const accessToken = this.authService.generateToken(user.id);
  const refreshToken = this.authService.generateRefreshToken(user.id);
  return { accessToken, refreshToken };
}
```

### Refreshing Tokens
The refresh endpoint allows users to obtain a new access token using the refresh token.

**Refresh Token Endpoint:**
```typescript
@Post('refresh')
@ApiBody({ type: String, description: 'Refresh token' })
@ApiResponse({ status: 200, description: 'Token refreshed.' })
@ApiResponse({ status: 401, description: 'Invalid refresh token.' })
async refresh(
  @Body('refreshToken') refreshToken: string,
  @Res() res: Response,
) {
  try {
    const decoded = this.authService.verifyToken(refreshToken, true); // Verify using the refresh token
    const newAccessToken = this.authService.generateToken(decoded.userId);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}
```

### Instructions for Use
1. **Login:**
   - Make a POST request to the login endpoint with user credentials.
   - You will receive both an `accessToken` and a `refreshToken`.

2. **Refresh Access Token:**
   - Make a POST request to the `/refresh` endpoint with the `refreshToken`.
   - If the `refreshToken` is valid, you will receive a new `accessToken`.

## Contributing

This section would include guidelines for contributing to the project, if applicable.

## License

Include licensing information for your project.
```

Puedes copiar este contenido directamente en tu `README.md`. Si necesitas hacer más ajustes o tienes preguntas adicionales, estoy aquí para ayudarte.
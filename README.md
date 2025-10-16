# Clean Modular Delivery API

This project implements a clean, modular architecture for a delivery management system API, built with TypeScript and Node.js.

## Features

- **Modular Design**: Each business domain (User, Order, etc.) is a self-contained module.
- **Clean Architecture**: Follows Domain-Driven Design (DDD) principles to separate concerns.
- **TypeScript**: Strong typing for better code quality and maintainability.
- **Express**: Handles HTTP routing and middleware.
- **Prisma**: Modern ORM for database interactions.
- **Dockerized**: Easy setup with Docker and Docker Compose.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd clean-modular-delivery
    ```

2.  **Create an environment file:**
    ```bash
    cp .env.example .env
    ```
    *Update the variables in `.env` as needed.*

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the services using Docker:**
    ```bash
    docker-compose up -d
    ```

5.  **Run the application in development mode:**
    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:3000`.

## Project Structure

The project follows a clean, modular architecture:

- `src/main.ts`: Application entry point.
- `src/app.ts`: Express application setup.
- `src/config/`: Environment variables and constants.
- `src/core/`: Shared kernel with base classes, errors, and utilities.
- `src/infrastructure/`: Concrete implementations (Express, Prisma, Redis).
- `src/modules/`: Contains the different business modules (e.g., `user`, `order`).
- `src/tools/`: Scripts for development, like scaffolding new modules.

Each module inside `src/modules/` has its own layers:
- `domain`: Core business logic and entities.
- `application`: Use cases and DTOs.
- `infrastructure`: Data persistence and implementation details.
- `presentation`: API controllers and routes.
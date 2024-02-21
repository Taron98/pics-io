# Pics.io

Pics.io is a project for managing and accessing images. It provides a server and MongoDB setup using Docker and Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

To start using Pics.io, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd Pics.io
    ```

3. Start the server and MongoDB using Docker Compose:

    ```bash
    docker-compose up
    ```

   This command will build the Docker images and start the containers for the Pics.io server and MongoDB.

4. Once the containers are up and running, you can access the Pics.io server at [http://localhost:3000](http://localhost:3000).

## Documentation

After starting the server, you can access the API documentation using the following links:

- [API Documentation](http://localhost:3000/api-docs) - Explore the APIs using Swagger UI.
- [Detailed Documentation](http://localhost:3000/docs) - Detailed documentation for using Pics.io.

## Usage

Once the server is running, you can interact with the APIs to manage and access images. The APIs are accessible at [http://localhost:3000](http://localhost:3000).

For easier interaction with the APIs, you can use Swagger UI by visiting [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

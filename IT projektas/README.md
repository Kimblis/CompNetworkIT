## Description

Computer Networks IT project.

## Installation

Install packages:

```bash
$ yarn
```

- Create .env file

  ```bash
   cp .env.example .env
  ```

- Fill missing environment variables in `.env` file

Set up your database:

```bash
$ docker-compose up -d cnmysql
```

## Running the app

```bash
# development
$ docker-compose up --build app_dev
$ docker-compose up app_dev
```

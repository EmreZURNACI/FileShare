
# FileShare

This project is a simple web application that allows users to upload and store files and download them again when needed. The user interface built with React works with a fast backend powered by Golang. User information is stored securely with the PostgreSQL database. The app offers basic features like user registration, login, and file management.




## Features

- User registration and login
- File uploading and storage
- File downloading
- Secure storage of user information
## Technologies Used

**Client:** React,Redux,React Router Dom,TailwindCSS

**Server:** Go,PostgreSQL

  
# Upload


## 1.Cloning the project

Run the following command to clone the project from GitHub:

```bash 
    git clone <https://github.com/EmreZURNACI/FileShare>
```

After cloning, switch to the project:

```bash 
    cd FileShare
```


## 2.Server installation

**Warning**: PostgreSQL must be installed to start the server.

Go to the backend directory to install the necessary libraries on the server side:

```bash 
   cd Server/
```

Install the required dependencies:

```bash 
    go mod tidy
```

To start the server:

```bash 
    go run main.go
```

The server starts running on port http://localhost:8080.


## 3.Client installation

First go to the client directory:

```bash 
    cd Client/
```

Run the following command to install the required dependencies:

```bash 
    npm install
```

To start the project:

```bash 
    npm run start
```

The client starts running on port http://localhost:3000.


# 🔗 URL Shortener API  

A **full-featured URL shortener service** built with **Node.js**, **Express**, and **PostgreSQL**.  
This project provides **RESTful APIs** for user authentication, URL shortening, and analytics.

---

## 🚀 Features  

- 🔐 **User Authentication** — JWT-based signup and login  
- ✂️ **URL Shortening** — Convert long URLs to short codes  
- 🧩 **URL Management** — View and delete your shortened URLs  
- 🔁 **Redirection** — Automatic redirect to original URLs  
- 🛡️ **Secure & Type-safe** — Built using **Zod validation** and **Drizzle ORM**

---

## 🛠 Tech Stack  

```bash
| Category         | Technology           | Purpose                                 |
|------------------|----------------------|------------------------------------------|
| Backend          | Node.js + Express    | REST API development                     |
| Database         | PostgreSQL           | Relational data store                    |
| ORM              | Drizzle ORM          | Type-safe database queries & schema      |
| Containerization | Docker + Compose     | Local PostgreSQL instance                |
| Authentication   | JWT                  | Secure private routes                    |
| Validation       | Zod                  | Input validation                         |
| Testing          | Postman              | Manual API testing                       |

---

## 📋 Prerequisites  

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or above recommended)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
- [Postman](https://www.postman.com/) (for API testing)  
- [VS Code](https://code.visualstudio.com/) (recommended editor)

---

## 🏗️ Project Structure  

```text
src/
├── controllers/     # Route controllers
├── services/        # Business logic
├── models/          # Database models
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── validation/      # Zod schemas
└── config/          # Configuration files


## 🔌 API Endpoints

### 🧍‍♂️ Auth Routes
```bash
| Method | Endpoint     | Description              | Auth Required |
|--------|--------------|--------------------------|----------------|
| POST   | '/signup'    | Register a new user      | ❌             |
| POST   | '/login'     | Login and receive token  | ❌             |


## 🔗 URL Routes

| Method | Endpoint       | Description                                 | Auth Required |
|--------|----------------|---------------------------------------------|----------------|
| POST   | '/shorten'     | Create a short URL from a long one          | ✅             |
| GET    | '/:shortCode'  | Redirect to the original URL                | ❌             |
| GET    | '/urls'        | Get all URLs created by the logged-in user  | ✅             |
| DELETE | '/urls/:id'    | Delete a short URL (if it belongs to user)  | ✅             |

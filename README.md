# 🛠️ User Management System

This project is a React-based User Management System with a Go backend. It allows users to perform CRUD operations (Create, Read, Update, Delete) on a list of users stored in a SQLite database.

## ✨ Features

📝 View Users: Display all users in a modern data grid interface.

➕ Add Users: Add new users through a simple form dialog.

✏️ Edit Users: Update existing user details with an intuitive edit 
form.

❌ Delete Users: Remove users directly from the database.

💾 SQLite Integration: Ensures all data is persisted reliably.


## 🚀 Prerequisites

 Before you begin, ensure you have the following installed:

- Node.js (v14 or higher) for the frontend.

- Go (v1.16 or higher) for the backend.

- SQLite for the database.

## ⚙️ Installation
1. Clone the repository:
```
git clone https://github.com/your-username/user-management.git
cd user-management
```

2. Install dependencies for both frontend and backend.

   Frontend:
```
cd user-management
npm install
```

  Backend:
  ```
go mod tidy
```
## ▶️ Running the Application

🖥️ Backend

```
go run main.go
```

🌐 Frontend
```
cd user-management
npm run dev
```
🛠️ API Endpoints

| Method        | Endpoint      | Description   |
| ------------- | ------------- | ------------- | 
| GET  | /api/users  | Fetch all users  | 
| GET  | /api/users/{id:[0-9]+}  | Fetch users by id  |
| POST  | /api/users  | 	Add a new user  |
| PUT  | /api/users/{id:[0-9]+}  | 	Update a user |
| DELETE  | /api/users/{id:[0-9]+}  | Delete a user  |

🛠️ Technologies Used
* Frontend: React, Next.js
- Backend: Go, gorilla
- Database: SQLite
- HTTP Client: Axios


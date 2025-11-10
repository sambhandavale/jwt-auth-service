# 🔐 JWT Authentication Template (TypeScript + Express)

A clean and modular starter template for building secure authentication APIs using **Node.js**, **Express**, **TypeScript**, and **JWT (JSON Web Tokens)**.

## 📂 Project Structure
```

```
├── config/         # Database & environment configurations
├── controllers/    # Authentication and user controllers
├── models/         # Database models (e.g., User schema)
├── routes/         # Route definitions for authentication
├── App.ts          # Main application entry point
├── package.json    # Project dependencies
├── tsconfig.json   # TypeScript configuration
└── .gitignore
```

````markdown
## ⚙️ Features
- 🔑 JWT-based authentication (login, register, verify)
- 🧱 Modular folder structure
- 🛡️ Secure password hashing with bcrypt
- 🌐 Environment variable support via dotenv
- 💡 Written fully in TypeScript
- 🧩 Ready to integrate with MongoDB or any database

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file in the root directory:

```
PORT=6000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the server

```bash
npm start
```

Server will start on:
👉 [http://localhost:6000](http://localhost:6000)

## 🧠 Tech Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB**
* **JWT**
* **bcrypt**

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

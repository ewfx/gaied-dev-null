# 🚀 Project Setup Guide

This guide will help you set up both the **server** and **client** for the project.

---

## **1️⃣ Prerequisites**

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (for the server)
- **pnpm** (for the client)

If you don’t have **pnpm**, install it globally:

```sh
npm install -g pnpm
```

2️⃣ Backend (TypeScript Server)
📌 Steps to Set Up
Navigate to the server directory

```sh
cd server
```

Install dependencies

```sh
npm install
```

Create an .env file and add the required variables:

```sh
cp .env.example .env
```

Update the .env file with the required values:

```sh
env
Copy
Edit
OPENAI_API_KEY=your_openai_api_key
OPENROUTER_API_URL=your_openrouter_api_url
ENABLE_DEDUPLICATION=true
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the development server

```sh
npm run dev
```

📌 Default Backend URL: http://localhost:3000

3️⃣ Frontend (Next.js - pnpm)
📌 Steps to Set Up
Navigate to the client directory

```sh
cd client
```

Install dependencies using pnpm

```sh
pnpm install
```

Start the development server

```sh
pnpm run dev
```

### 📌 Default Frontend URL: http://localhost:4000

### 4️⃣ Running Both Together

Start the backend (npm run dev in server/)

Start the frontend (pnpm run dev in client/)

Open http://localhost:4000 in your browser

5️⃣ Troubleshooting
🔹 Backend Issues
If the server doesn’t start, check your .env file and ensure MONGO_URI is correct.

Ensure MongoDB is running locally or that your cloud connection string is valid.

🔹 Frontend Issues
If the frontend fails to start, run:

```
sh
rm -rf node_modules && pnpm install
```

Make sure the backend is running before starting the frontend.

✅ You're All Set! 🎉

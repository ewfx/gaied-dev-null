# 🚀 Gen AI Orchestrator for Email and Document Triage/Routing

## 📌 Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction

Gen AI Orchestrator is a system designed to automate **email and document triage** for loan servicing platforms. It processes incoming emails, extracts key details from attachments, and intelligently categorizes requests using **Large Language Models**. The system helps **reduce manual effort, improve response times, and ensure accurate classification** of service requests.

## 🎥 Demo

🔗 [Live Demo](#) _(Coming Soon!)_  
📹 [Video Demo](#) _(Coming Soon!)_  
🖼️ Screenshots:

![Screenshot 1](link-to-image)

---

## 💡 Inspiration

Financial institutions handle **thousands of loan servicing requests daily**, making **manual processing inefficient**. Our goal was to create a **smart AI-powered solution** that can **automate the triaging of emails and attached documents**, helping teams focus on higher-value tasks.

---

## ⚙️ What It Does

- 📩 **Parses emails and attachments (PDFs, Word, Excel)**
- 📌 **Extracts important details (deal name, amount, expiration date, etc.)**
- 🏷 **Assigns request types & sub-types based on predefined rules**
- 🔍 **Interprets the primary intent of emails**
- ✅ **Prioritizes and assigns confidence scores**
- ⚡ **Integrates with OpenAI APIs for intelligent processing**
- 📊 **Provides a structured JSON response for downstream use**

---

## 🛠️ How We Built It

- **Email Parsing & Attachment Extraction:** Built using **JavaScript**
- **LLM Integration:** Uses **OpenAI & OpenRouter APIs** for AI processing
- **Database Storage:** Stores extracted details in **MongoDB**
- **Frontend:** Developed with **Next.js (Radix UI + TailwindCSS)**
- **Backend:** Built with **Node.js & Express (TypeScript)**
- **Deployment:** Can be hosted on **Vercel / AWS / DigitalOcean**

---

## 🚧 Challenges We Faced

- **Normalizing LLM Output**: Extracting structured JSON response from the LLM was challenge for us but we tackled it using Regular Expressions and prompt engineering.
- **Handling Complex Attachments**: Extracting structured data from **PDFs, Word, and Excel** files was challenging.
- **LLM Cost Optimization**: Ensuring high accuracy with minimal calls to the LLM API's.
- **Scalability**: Designing a **robust system** that can handle **high email volumes**.
- **Ensuring High Accuracy**: **Tuning AI prompts** for better classification and **reducing false positives**.

---

## 🏃 How to Run

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

## 🏗️ Tech Stack

- 🔹 Frontend: Next js, Tailwind CSS, Radix UI, CVA
- 🔹 Backend: Node.js, Typescript, textract, LRU Cache, Mail Parser, Multer
- 🔹 Database: MongoDB
- 🔹 Other: DeepSeek R1 Free API, Open Router API

## 👥 Team

- **Utkarsh** - [GitHub](https://www.github.com/utkarsh575) | [LinkedIn](https://www.linkedin.com/in/utkarsh575)

- **Ankita Srivastav** - [LinkedIn](https://www.linkedin.com/in/ankita-srivastav-359786148/)

- **Ashish Bhasin** - [LinkedIn](https://www.linkedin.com/in/ashish-bhasin-24623452/)

# 🚀 Gen AI Orchestrator for Email and Document Triage/Routing

## 📌 Table of Contents

- [Introduction](#-introduction)
- [Demo](#-demo)
- [Inspiration](#-inspiration)
- [What It Does](#-what-it-does)
- [How We Built It](#-how-we-built-it)
- [Challenges We Faced](#-challenges-we-faced)
- [How to Run](#-how-to-run)
- [Tech Stack](#-tech-stack)
- [Team](#-team)

---

## 🎯 Introduction

Gen AI Orchestrator is a system designed to automate **email and document triage** for loan servicing platforms. It processes incoming emails, extracts key details from attachments, and intelligently categorizes requests using **Large Language Models**. The system helps **reduce manual effort, improve response times, and ensure accurate classification** of service requests.

## 🎥 Demo

📹 [Video Demo](https://github.com/ewfx/gaied-dev-null/blob/main/artifacts/demo/dev-null-demo(with%20voice).mp4)  


🖼️ Screenshots:
#### Landing 
![image](https://github.com/user-attachments/assets/c62ba0b4-f071-40ed-aed4-54a738f993cb)
### Request Type Configuration
![image](https://github.com/user-attachments/assets/cb3e9a9f-3c5f-4893-b43f-15fac86f5579)
### Editing Request types
![image](https://github.com/user-attachments/assets/d430605a-1957-4936-9d05-757b4971bb48)
### Request type Presets (Loan Servicing specific)
![image](https://github.com/user-attachments/assets/8102b91c-f9b9-432e-a64b-b579bb534f8b)
### Adding Custom Request type
![image](https://github.com/user-attachments/assets/afffca17-e26b-45c4-a5e4-6454d8f51b3b)
### Successful EML Upload
![image](https://github.com/user-attachments/assets/a9b38a61-be8a-4565-a6e7-188dc0c985e5)
### Email Processing output 
![image](https://github.com/user-attachments/assets/afe3fa18-aac6-46cf-a6cc-dfd71194a448)
![image](https://github.com/user-attachments/assets/9a6bc8d4-c823-4c50-b915-7dc469c500f8)
![image](https://github.com/user-attachments/assets/282e90ce-2659-4a94-bdb8-039a9b540903)
### Duplicate Hnadling 
![image](https://github.com/user-attachments/assets/ea959e17-bda9-4528-bfc4-13aa13288b34)

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

# 🧪 QualGent/TestPilot

QualGent is an AI-powered test case assistant built to help QA teams and developers quickly generate, manage, and preview mobile app test cases using natural language. It combines the power of Supabase, React, and AI to streamline QA workflows — no spreadsheets, no clutter.

## Deployed
https://qualgent.netlify.app/

---

## 🚀 Features

- ✨ **AI Test Case Generator** – Generate test cases from natural language prompts using built-in AI.
- 🧪 **AI Test Suite Review** – Automatically review your entire test suite for coverage, consistency, and improvement suggestions.
- 📝 **Dynamic Form Builder** – Create and edit test cases with title, steps, expected behavior, tags, status, and category.
- 📋 **Test Case List View** – View all saved test cases with edit/delete support and real-time sync from Supabase.
- 🔄 **Drag & Drop Layout** – Rearrange core panels (form, list, preview, AI) using drag-and-drop (via `@dnd-kit`).
- 👀 **Live Preview** – Instantly preview test cases in a formatted, printable view.
- ☁️ **Supabase Backend** – All test cases are saved and retrieved from a Supabase PostgreSQL backend.
- 🎨 **Modern UI** – Built with Tailwind CSS and Framer Motion for smooth interactions and a clean look.
- 📦 **Built-in Toast Notifications** – Get real-time feedback on actions like save/delete/update.

---

## 🧰 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **AI:** OpenAI or local model-compatible prompts
- **Backend:** Supabase
- **State Management:** React Context & Hooks
- **Animations:** Framer Motion
- **Drag & Drop:** `@dnd-kit/core`
- **Toast Notifications:** `react-hot-toast`

---


---

## 🧪 Local Development Setup

### 1. Download the repo

## Install Dependencies

 npm i
 
 npm init -y

 ## Setup .env file

 VITE_SUPABASE_URL=your_supabase_url
 
VITE_SUPABASE_ANON_KEY=your_anon_key

VITE_OPENAI_API_KEY=sk-

## Run the setup

npm run dev


## Please reach out to me if you need any more information on the project

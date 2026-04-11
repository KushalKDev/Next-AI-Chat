# 💬 Modern Chat Interface

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://next-ai-chat-nu.vercel.app/chat)

A sleek, responsive, and high-performance chat interface built with **Next.js**, **React**, and **Tailwind CSS**. This project features a clean UI for handling both standard and streaming chat responses.

## 🔗 Live Demo
Check out the live application here: [https://next-ai-chat-nu.vercel.app/chat](https://next-ai-chat-nu.vercel.app/chat)

## 🚀 Features

* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.
* **Modern UI:** Features soft shadows, rounded corners, and a professional color palette.
* **Dual Response Handling:** Visual differentiation between "Regular" and "Streamed" chat responses.
* **Interactive Elements:** Hover and active states for buttons, along with custom focus rings for input fields.
* **Clean Code:** Written using Tailwind utility classes for easy maintenance.

## 🛠️ Tech Stack

* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React (Optional)

## 📦 Getting Started

### 1. Clone the repository
bash
git clone [https://github.com/KushalKDev/Next-AI-Chat.git](https://github.com/KushalKDev/Next-AI-Chat.git)
cd chat-app

### 2. Install dependencies
Bash
npm install
# or
yarn install

### 3. Run the development server
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

📂 Component Highlights
The main interface is contained within a single responsive wrapper. Key layout choices include:

Header: Fixed-width container with a vibrant orange gradient/solid background.

Input Section: A textarea with auto-focus styling and custom padding.

Response Boxes: Styled with shadow-inner and light background tints (bg-green-50 and bg-purple-50) to separate them from the main background.

🎨 Customization
To change the theme, simply update the Tailwind classes:

Primary Brand: Update bg-orange-600.

Streaming Accent: Update bg-purple-600.

Container Width: Change max-w-3xl to max-w-5xl for a wider view.

📝 License
This project is open-source and available under the MIT License.
# MegaBlog 📝

A modern full-stack blogging platform where users can create, edit, manage, and publish blog posts with rich text formatting, secure authentication, and media uploads.

---

## 🚀 Live Demo

🔗 [Live Demo](#)
🔗 [Frontend Repository](#)

---

## 📌 Features

* 🔐 User Authentication (Sign Up / Login / Logout)
* 📝 Create Blog Posts
* ✏️ Edit Existing Posts
* ❌ Delete Posts
* 🖼️ Upload Featured Images
* 📖 Rich Text Editor for Blog Content
* 👤 Author-Based Access Control
* 📱 Fully Responsive Design
* ⚡ Fast and Optimized UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Redux Toolkit
* React Hook Form

### Backend

* Appwrite

### Other Libraries

* TinyMCE (Rich Text Editor)
* html-react-parser

---

## 📂 Project Structure

```bash
MegaBlog/
│
├── public/
├── src/
│   ├── appwrite/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── conf/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/megablog.git
```

Move into project directory:

```bash
cd megablog
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## 🔄 Application Flow

1. User registers or logs in.
2. Authentication handled via Appwrite.
3. Auth state stored using Redux Toolkit.
4. User creates blog posts using Rich Text Editor.
5. Posts are stored in Appwrite Database.
6. Featured images are stored in Appwrite Storage.
7. Author can edit or delete their own posts.

---

## 📸 Screenshots

### Home Page

(Add screenshot here)

### Post Page

(Add screenshot here)

### Create Post Page

(Add screenshot here)

---

## 🔒 Authentication Flow

* Sign Up
* Login
* Session Management
* Logout

Protected routes ensure only authenticated users can create or manage posts.

<!-- ---

## 🎯 Future Improvements

* 💬 Comments System
* ❤️ Likes Feature
* 🔎 Search Functionality
* 🌙 Dark Mode
* 📊 Dashboard Analytics
* 🏷️ Categories & Tags

--- -->

## 🧠 Key Learnings

This project helped me improve my understanding of:

* React Architecture
* State Management with Redux Toolkit
* Form Handling with React Hook Form
* Backend Integration using Appwrite
* Authentication & Authorization
* CRUD Operations
* File Upload Handling

---

## 👨‍💻 Author

**Chirag Arya**

* GitHub: https://github.com/Chirag-2006
* LinkedIn: https://www.linkedin.com/in/chirag-arya-53350b23b/


---

## ⭐ Support

If you liked this project, consider giving it a star ⭐

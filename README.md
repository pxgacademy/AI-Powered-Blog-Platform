## ✅ Project Overview: **AI-Powered Blog Platform**

### 🎯 Features

1. **User Auth System**

   * Signup/Login (JWT or session-based)
   * Role-based access (User, Admin)

2. **Blog Management**

   * Create, Edit, Delete blog posts
   * Rich text editor using **Tiptap**
   * AI suggestion/generation for blog content via **Gemini API**

3. **AI Assistant**

   * Chat UI for AI where user can type a topic
   * AI responds with generated blog content suggestion

4. **Interaction Features**

   * Like/Unlike blogs
   * Comment on blogs
   * Author-only permissions for edit/delete

5. **RTK Query Integration**

   * All client-server communication handled using **RTK Query**

---

## 🗺️ Roadmap

### 🏗 Phase 1: Project Setup

* [ ] Setup Next.js with TypeScript
* [ ] Configure TailwindCSS or other styling library
* [ ] Setup MongoDB connection with Mongoose
* [ ] Folder structure design
* [ ] Install and setup RTK Query & Redux

### 🔐 Phase 2: Authentication

* [ ] Create auth API routes (register/login)
* [ ] JWT/session-based auth
* [ ] Protect routes (middleware or HOC)
* [ ] Store auth state in Redux

### ✍️ Phase 3: Blog CRUD

* [ ] Design Tiptap Editor for writing
* [ ] Create API for blogs (CRUD)
* [ ] Integrate RTK Query hooks
* [ ] Blog list, details, edit, delete UI

### 🤖 Phase 4: AI Chat Integration

* [ ] Create chatbox component
* [ ] Send prompt to Gemini API
* [ ] Receive and display AI-generated blog suggestion
* [ ] Allow user to accept the suggestion into the editor

### 💬 Phase 5: Like & Comment System

* [ ] Blog like/unlike feature
* [ ] Blog comment feature (CRUD)
* [ ] RTK Query endpoints

### 🧪 Phase 6: Polish & Testing

* [ ] Protect author-only actions
* [ ] Error handling
* [ ] Form validations
* [ ] Loading & UI polish
* [ ] Optional: Dark mode

---

## 🗂️ Folder Structure

```
ai-blog-platform/
│
├── app/                    # Next.js 13+ App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/             # Login/Register Pages
│   ├── dashboard/          # User Dashboard Pages
│   └── blog/               # Blog pages (list/detail/editor)
│
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── blog/               # BlogCard, BlogEditor, BlogList etc.
│   ├── ai/                 # AIChatBox, PromptInput
│   └── auth/               # LoginForm, RegisterForm
│
├── features/
│   ├── auth/               # RTK slice + API slice
│   ├── blog/               # RTK API slice
│   ├── ai/                 # RTK slice or service for AI
│   └── comment/            # RTK API slice
│
├── lib/
│   ├── api.ts              # fetch wrapper
│   └── auth.ts             # JWT helper functions
│
├── models/
│   ├── User.ts
│   ├── Blog.ts
│   └── Comment.ts
│
├── pages/api/              # Backend API routes
│   ├── auth/
│   ├── blogs/
│   ├── comments/
│   └── ai/
│
├── public/
│
├── styles/
│   └── globals.css
│
├── store/
│   ├── index.ts            # Redux store config
│   └── middleware.ts       # RTK middleware if needed
│
├── utils/
│   └── constants.ts
│   └── validators.ts
│
├── .env.local              # API keys and secrets
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🧠 AI Integration Guide (Gemini API)

* Use Gemini API or OpenAI API.
* Example prompt: `"Write a detailed blog on the topic: 'The Future of AI in Education'"`.
* Use `fetch` in API route to send prompt and return to frontend.
<h1>
  <img src="./public/logo.svg" alt="Logo" width="100" height="40" style="vertical-align: middle;" />
</h1>

A full-stack AI chat application inspired by [T3 Chat](https://t3.chat), built with Next.js, Prisma, Clerk, and OpenRouter. Supports multiple free AI models, real-time streaming, and persistent chat history.

🔗 **Live Demo:** [t3-chat-build.vercel.app](https://t3-chat-build.vercel.app)

---

## ✨ Features

- 🤖 **Multi-model AI support** via OpenRouter.
- 💬 **Real-time streaming** responses using Vercel AI SDK
- 🔐 **Authentication** with Clerk (sign up, sign in, session management)
- 🗄️ **Persistent chat history** powered by Prisma + PostgreSQL (Neon)
- 🎨 **Polished UI** with Tailwind CSS v4, shadcn/ui, and Radix UI primitives
- 🌙 **Dark/Light mode** with `next-themes`
- 🗂️ **Sidebar with chat management** using Zustand for state

---

## 🛠️ Tech Stack

| Layer            | Technology                                                |
| ---------------- | --------------------------------------------------------- |
| Framework        | Next.js 16 (App Router)                                   |
| Language         | TypeScript                                                |
| Auth             | Clerk                                                     |
| Database         | PostgreSQL (Neon)                                         |
| ORM              | Prisma 7 with `@prisma/adapter-neon`                      |
| AI / LLMs        | OpenRouter (`@openrouter/ai-sdk-provider`), Vercel AI SDK |
| State Management | Zustand, TanStack React Query                             |
| UI Components    | shadcn/ui, Radix UI, Base UI                              |
| Styling          | Tailwind CSS v4                                           |

---

## 📁 Project Structure

```
t3-chat-clone/
├── app/               # Next.js App Router pages & API routes
├── components/        # Reusable UI components
├── interfaces/        # TypeScript interfaces & types
├── lib/               # DB setup & Utility functions
├── modules/           # Feature modules (chat, sidebar, etc.)
├── prisma/            # Prisma schema & migrations
├── public/            # Static assets
├── docker-compose.yml # Local PostgreSQL setup
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker (for local database)
- A [Clerk](https://clerk.com) account
- An [OpenRouter](https://openrouter.ai) API key
- A [Neon](https://neon.tech) database (for production) or local PostgreSQL via Docker

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

<p align="center">Built with ❤️ by <a href="https://github.com/himanshuramteke">himanshuramteke</a></p>

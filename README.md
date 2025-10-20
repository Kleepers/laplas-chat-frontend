<div align="center">
  <h1>🚀 Laplas Chat</h1>
  <p><strong>AI Chat Application with Enterprise-Grade Security</strong></p>
  
  <p>
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#secure-mode">Secure Mode</a> •
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

---

## 📖 About

Laplas Chat is a modern AI chat application that brings together cutting-edge language models with enterprise-grade security. Built for organizations that need powerful AI capabilities without compromising on data privacy.

This repository contains the frontend applications:
- **Client**: Main chat interface for end users
- **Admin**: Management panel for user and system configuration

---

## Backend Link: TBD

## ✨ Features

### 🔒 Secure Mode
**Use advanced AI models without risking data leaks**

Our revolutionary Secure Mode protects your sensitive information through intelligent obfuscation:

```
User Input → Backend detects sensitive data → Local model obfuscates
    ↓
Sanitized request → Advanced AI Model (GPT-4, Claude, etc.)
    ↓
Response received → De-obfuscation → Original values restored
    ↓
Secure response delivered to user
```

**How it works:**
- 🛡️ **Automatic Detection**: Local model (e.g., DeepSeek) identifies confidential information
- 🔄 **Smart Obfuscation**: Sensitive data is masked before reaching external AI providers
- ✨ **Seamless Restoration**: Original values are replaced back in the response
- 🎯 **Zero Exposure**: Your sensitive data never leaves your infrastructure

**Protected data types:**
- Personal Identifiable Information (PII)
- API keys and credentials
- Internal project names and codenames
- Financial data
- Custom-defined sensitive patterns

### 🌐 Web Search Integration
- Real-time web search during conversations
- Enhanced responses with up-to-date information
- Seamless integration with chat flow

### ✅ Fact-Check System
- **Verify any AI response** with a single click
- Configure verification models (Perplexity, Grok, or custom backend settings)
- Side-by-side comparison of original and verified responses
- Reduce AI hallucinations and increase confidence in answers

### 👥 Admin Panel Features
- User management and permissions
- Configure user credentials and profiles (name, password, roles)
- System configuration and model settings
- Usage monitoring and analytics

### 🎨 Additional Features
- **Multi-Model Support**: Access various AI providers (OpenAI, Anthropic, Google, Meta, and more)
- **File Uploads**: Attach documents and images to conversations
- **Markdown Support**: Rich text formatting in responses
- **Code Highlighting**: Beautiful syntax highlighting for code blocks
- **Dark/Light Theme**: Comfortable viewing in any environment
- **Mobile Responsive**: Works seamlessly on all devices
- **i18n Support**: Multi-language interface (English, Russian)

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **TanStack Router** - Type-safe routing solution
- **TanStack Query** - Powerful data fetching and caching
- **Zustand** - Lightweight state management

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Shadcn/ui** - Beautiful, customizable component library
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Consistent icon system

### Additional Tools
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation
- **Axios** - HTTP client for API requests
- **i18next** - Internationalization framework
- **React Markdown** - Markdown rendering
- **Shiki** - Syntax highlighting for code blocks

---

## 📁 Repository Structure

```
laplas-chat-frontend/
├── client/         # 💬 Main chat application
└── admin/          # ⚙️ Admin management panel
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the open-source community
- Inspired by the need for secure AI interactions in enterprise environments
- Thanks to all contributors who help make this project better

---

<div align="center">
  <p>Made with ❤️ by the Laplas Team</p>
</div>

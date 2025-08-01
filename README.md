# 技术博客

基于 Next.js 15 + TypeScript + Tailwind CSS 构建的现代化技术博客系统，支持 YAML 配置、MDX 文章管理、RSS 订阅等功能。

## ✨ 特性

- 🚀 **Next.js 15** - 基于最新的 React 框架
- 📝 **MDX 支持** - 支持 Markdown + JSX 的文章编写
- 🎨 **Tailwind CSS** - 现代化的样式系统
- 🌙 **暗色模式** - 支持明暗主题切换
- 📱 **响应式设计** - 适配各种设备尺寸
- 🔍 **搜索功能** - 全文搜索文章内容
- 🏷️ **标签系统** - 文章分类和标签管理
- 📊 **统计面板** - 自动计算博客统计数据
- 📧 **邮件订阅** - 支持多种第三方邮件服务
- 🗂️ **YAML 配置** - 类似 Hugo 的配置系统
- 📡 **RSS 订阅** - 自动生成 RSS 源
- 🗺️ **站点地图** - SEO 优化的 XML 站点地图

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置必要的环境变量。

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
├── config.yaml                 # 站点配置文件
├── content/
│   └── posts/                  # MDX 文章目录
├── public/                     # 静态资源
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React 组件
│   ├── lib/                    # 工具库
│   └── styles/                 # 样式文件
├── vercel.json                 # Vercel 部署配置
└── README.md
```

## 📝 内容管理

### 添加文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
excerpt: "文章摘要"
publishDate: "2024-01-01"
readTime: 5
tags: ["React", "TypeScript"]
featured: true
author: "作者名"
image: "/images/article-cover.jpg"
---

# 文章内容

这里是文章的正文内容...
```

### 配置站点

编辑 `config.yaml` 文件来配置站点信息：

```yaml
site:
  title: "技术博客"
  description: "分享技术见解与实践经验"
  url: "https://your-domain.com"
  
author:
  name: "Your Name"
  email: "your@email.com"
  bio: "技术爱好者"
```

## 🚀 部署到 Vercel

### 1. 连接 GitHub

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "New Project" 并选择你的 GitHub 仓库

### 2. 配置环境变量

在 Vercel 项目设置中添加环境变量：

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=TechBlog
```

### 3. 部署设置

Vercel 会自动检测 Next.js 项目并使用合适的构建设置。`vercel.json` 配置文件已包含：

- RSS 和 Sitemap 路由重写
- 安全头设置
- 缓存优化
- URL 重定向

### 4. 自定义域名

在 Vercel 项目设置中可以添加自定义域名。

## 📧 邮件订阅配置

支持多种邮件订阅服务，在 `.env.local` 中配置：

### EmailJS (推荐)
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Formspree
```env
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id
```

### Mailchimp
```env
NEXT_PUBLIC_MAILCHIMP_URL=https://your_domain.us1.list-manage.com/subscribe/post-json
NEXT_PUBLIC_MAILCHIMP_U=your_u_value
NEXT_PUBLIC_MAILCHIMP_ID=your_list_id
```

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 📈 SEO 优化

- 自动生成 RSS 订阅源 (`/rss.xml`)
- 自动生成站点地图 (`/sitemap.xml`)
- 结构化数据支持
- Meta 标签优化
- Open Graph 支持

## 🎨 自定义主题

项目使用 Tailwind CSS，可以通过修改 `tailwind.config.js` 来自定义主题：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // 自定义主色调
        }
      }
    }
  }
}
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
# 技术博客配置文档

本项目采用类似Hugo的YAML配置系统，所有内容都可以通过修改 `config.yaml` 文件来自定义，无需修改代码。

## 📁 配置文件结构

```
tech-blog/
├── config.yaml          # 主配置文件（类似Hugo的config.yaml）
├── src/
│   └── lib/
│       └── config.ts     # 配置读取工具
└── ...
```

## 🎯 配置文件说明

### 1. 站点基本信息 (site)

```yaml
site:
  name: "Tech Blog"                    # 网站名称
  title: "现代前端技术博客"              # 网站标题  
  description: "专注于前端技术..."       # 网站描述
  url: "https://your-blog.com"         # 网站URL
  ogImage: "/og-image.jpg"             # Open Graph图片
  language: "zh-CN"                    # 网站语言
  timezone: "Asia/Shanghai"            # 时区
```

### 2. 作者信息 (author)

```yaml
author:
  name: "开发者"                       # 作者姓名
  email: "developer@example.com"      # 邮箱地址
  avatar: "/avatar.jpg"               # 头像路径
  bio: "全栈开发工程师..."              # 个人简介
  location: "中国"                    # 所在地
  website: "https://your-blog.com"    # 个人网站
  resume: "/resume.pdf"               # 简历文件路径（可选）
  
  # 社交媒体链接
  social:
    github: "https://github.com/yourusername"
    twitter: "https://twitter.com/yourusername"
    linkedin: "https://linkedin.com/in/yourusername"
    email: "developer@example.com"
```

### 3. 导航菜单 (navigation)

```yaml
navigation:
  - name: "首页"
    href: "/"
    weight: 1    # 排序权重，数字越小越靠前
  - name: "文章"
    href: "/posts"
    weight: 2
  # ... 更多导航项
```

### 4. 首页配置 (home)

#### Hero区域
```yaml
home:
  hero:
    title: "现代前端技术博客"
    subtitle: "探索前沿技术，分享开发经验"
    description: "专注于前端开发、JavaScript..."
    ctaText: "开始阅读"
    ctaLink: "/posts"
    backgroundImage: ""  # 可选的背景图片
```

#### 统计数据（自动计算）
```yaml
home:
  stats:
    title: "博客数据"    # 只需配置标题，数据自动计算
    # 自动计算的统计项：
    # - 技术文章数量（基于posts数量）
    # - 技术标签数量（基于tags数量）  
    # - 总字数（估算）
    # - 平均阅读时间
```

#### 文章区域配置
```yaml
home:
  featuredSection:
    title: "精选文章"
    description: "最受欢迎和最具价值的技术文章"
    showCount: 3          # 显示文章数量
  
  recentSection:
    title: "最新文章"
    description: "最近更新的技术内容"
    showCount: 6          # 显示文章数量
```

### 5. 关于页面配置 (about)

```yaml
about:
  title: "关于我"
  description: "了解更多关于这位全栈开发者的信息"
  bio: "我是一名热爱技术的全栈开发工程师..."
  
  # 技能分类
  skills:
    - category: "前端技术"
      items: ["React", "Vue.js", "TypeScript"]
    - category: "后端技术"
      items: ["Node.js", "Python", "Express"]
  
  # 工作经历
  experience:
    - title: "高级前端工程师"
      company: "科技公司"
      period: "2022 - 至今"
      description: "负责大型Web应用的前端架构设计..."
  
  # 教育背景（可选）
  education:
    - degree: "计算机科学学士"
      school: "某大学"
      period: "2016 - 2020"
  
  # 联系方式
  contact:
    title: "联系方式"
    description: "欢迎与我交流技术问题或合作机会"
    email: "developer@example.com"
    social:
      - platform: "GitHub"
        url: "https://github.com/yourusername"
        handle: "@yourusername"
```

### 6. 页脚配置 (footer)

```yaml
footer:
  copyright: "© 2024 Tech Blog. All rights reserved."
  links:
    - title: "导航"
      items:
        - name: "首页"
          href: "/"
        - name: "文章"
          href: "/posts"
    - title: "社交"
      items:
        - name: "GitHub"
          href: "https://github.com/yourusername"
```

### 7. SEO和分析配置 (seo)

```yaml
seo:
  keywords:
    - "前端开发"
    - "JavaScript"
    - "TypeScript"
    - "React"
  googleAnalytics: ""     # Google Analytics ID
  baiduAnalytics: ""      # 百度统计ID
```

### 8. 功能开关 (features)

```yaml
features:
  darkMode: true          # 深色模式
  search: true           # 搜索功能
  comments: false        # 评论系统
  rss: true             # RSS订阅
  sitemap: true         # 站点地图
```

## 🚀 快速开始

### 1. 基本配置

1. **编辑基本信息**：
   ```yaml
   site:
     name: "我的技术博客"
     title: "我的技术分享空间"
     description: "记录学习和成长的地方"
   ```

2. **设置作者信息**：
   ```yaml
   author:
     name: "张三"
     email: "zhangsan@example.com"
     bio: "前端开发工程师，热爱技术分享"
     resume: "/resume.pdf"  # 可选：简历文件路径
   ```

3. **更新社交链接**：
   ```yaml
   author:
     social:
       github: "https://github.com/zhangsan"
       twitter: "https://twitter.com/zhangsan"
   ```

4. **添加简历文件**（可选）：
   - 将简历PDF文件放在 `public/resume.pdf`
   - 在配置中设置 `author.resume: "/resume.pdf"`
   - 关于页面会自动显示下载按钮

### 2. 自定义首页

1. **修改Hero区域**：
   ```yaml
   home:
     hero:
       title: "欢迎来到我的博客"
       subtitle: "技术学习与分享"
       ctaText: "开始探索"
   ```

2. **统计数据标题**：
   ```yaml
   home:
     stats:
       title: "我的博客数据"  # 统计项会自动计算
   ```

### 3. 配置关于页面

1. **添加技能**：
   ```yaml
   about:
     skills:
       - category: "我的技能"
         items: ["HTML/CSS", "JavaScript", "React"]
   ```

2. **添加工作经历**：
   ```yaml
   about:
     experience:
       - title: "前端开发工程师"
         company: "某公司"
         period: "2023 - 至今"
         description: "负责产品前端开发工作"
   ```

## 🛠️ 高级配置

### 1. 自定义导航

```yaml
navigation:
  - name: "博客"
    href: "/posts"
    weight: 1
  - name: "项目"
    href: "/projects"
    weight: 2
  - name: "简历"
    href: "/resume"
    weight: 3
```

### 2. SEO优化

```yaml
seo:
  keywords:
    - "你的专业领域"
    - "技术栈关键词"
    - "个人品牌关键词"
  googleAnalytics: "GA_TRACKING_ID"
```

### 3. 功能开关

```yaml
features:
  darkMode: true      # 启用深色模式
  search: true       # 启用搜索
  comments: true     # 启用评论（需要额外配置）
  rss: true         # 启用RSS
```

## ✨ 智能功能

### 1. 自动统计数据
- **自动计算**: 文章数量、标签数量、总字数、平均阅读时间
- **实时更新**: 添加新文章后统计数据自动更新
- **无需配置**: 只需配置显示标题，数据自动生成

### 2. 简历下载功能
- **文件管理**: 将简历PDF放在 `public/resume.pdf`
- **自动显示**: 配置后关于页面自动显示下载按钮
- **灵活控制**: 不配置简历路径则不显示下载按钮

## 📝 注意事项

1. **YAML语法**：
   - 使用空格缩进，不要使用Tab
   - 字符串包含特殊字符时需要用引号
   - 布尔值使用 `true/false`

2. **图片和文件资源**：
   - 将图片和文件放在 `public/` 目录下
   - 路径以 `/` 开头，如 `/avatar.jpg`, `/resume.pdf`
   - 支持的简历格式：PDF、DOC、DOCX

3. **链接格式**：
   - 外部链接使用完整URL：`https://example.com`
   - 内部链接使用相对路径：`/about`

4. **重新构建**：
   - 修改配置后需要重新构建项目：
   ```bash
   npm run build
   npm run start
   ```

## 🎨 配置模板

### 个人博客模板
```yaml
site:
  name: "个人博客"
  title: "技术学习笔记"
  
author:
  name: "你的姓名"
  bio: "软件工程师，技术爱好者"
  
home:
  hero:
    title: "欢迎来到我的技术博客"
    subtitle: "记录成长，分享知识"
```

### 团队博客模板
```yaml
site:
  name: "团队技术博客"
  title: "技术团队分享平台"
  
author:
  name: "技术团队"
  bio: "专业的技术团队，分享最佳实践"
```

## 🔧 故障排除

1. **构建失败**：检查YAML语法是否正确
2. **配置不生效**：确保重新构建了项目
3. **图片不显示**：检查图片路径是否正确
4. **链接错误**：确认URL格式是否正确

---

🎉 **恭喜！** 你现在可以完全通过配置文件来自定义你的技术博客了！
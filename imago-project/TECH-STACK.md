# Imago Leisure — 技术文档

> 最后更新：2026-03-23

---

## 技术栈

| 层 | 技术 | 版本/说明 |
|----|------|----------|
| 结构 | HTML5 | 语义化标签 |
| 样式 | CSS3 (Vanilla) | CSS Variables 设计系统，无框架 |
| 交互 | JavaScript (ES6+) | 原生 JS，无依赖库 |
| 字体 | Google Fonts | Inter (无衬线) + Playfair Display (衬线) |
| 图标 | Emoji + 内联 SVG | WhatsApp SVG logo |

**无后端、无数据库、无构建工具**。所有文件可直接部署到任何静态托管服务。

---

## 项目文件结构

```
imago-project/
├── index.html              首页
├── about.html              关于我们
├── services.html           服务详情
├── pricing.html            定价
├── contact.html            联系我们
├── css/
│   └── style.css           全局设计系统 + 组件样式
├── js/
│   └── main.js             所有交互逻辑
├── website-analysis.md     原始网站分析 + 架构图
└── TECH-STACK.md           本文件
```

---

## CSS 设计系统

### 颜色

| 变量 | 值 | 用途 |
|------|----|------|
| `--color-bg` | `#0a0a0a` | 页面背景 |
| `--color-bg-card` | `#111111` | 卡片背景 |
| `--color-bg-elevated` | `#0d0d0d` | 高亮区块背景 |
| `--color-accent` | `#d9a14d` | 金色强调（按钮、标题、边框） |
| `--color-accent-hover` | `#e8b565` | 金色 hover 态 |
| `--color-text` | `#ffffff` | 主文字 |
| `--color-text-secondary` | `#b0b0b0` | 副文字 |
| `--color-text-muted` | `#666666` | 弱文字 |
| `--color-border` | `#1f1f1f` | 边框线 |

### 字体

| 用途 | 字体 | 变量 |
|------|------|------|
| 正文、按钮、导航 | Inter | `--font-sans` |
| 大标题 (h1, h2) | Playfair Display | `--font-serif` |

### 断点

| 断点 | 触发条件 |
|------|---------|
| 移动端 | `max-width: 768px` |
| 平板 | `max-width: 1024px` |

---

## JavaScript 功能清单

| 功能 | 触发方式 | 说明 |
|------|---------|------|
| 移动端导航开关 | 点击汉堡按钮 | toggle `.active` class，动画化三条横线 |
| FAQ 手风琴 | 点击问题行 | 展开当前、收起其他，动态计算 `maxHeight` |
| 回到顶部 | 滚动 > 600px | 显示按钮，点击 `scrollTo` smooth |
| Header 背景变化 | 滚动 > 50px | 增加背景不透明度 |
| 促销弹窗 | 首次访问 2 秒后 | `sessionStorage` 控制仅显示一次 |
| 滚动入场动画 | 元素进入视窗 | `IntersectionObserver`，添加 `.visible` class |
| 联系表单提交 | 点击 Send | 收集表单数据 → 拼装 WhatsApp 链接 → 新窗口打开 |

---

## 外部依赖

| 服务 | 用途 | 接入方式 |
|------|------|---------|
| WhatsApp | 预约/咨询 | `wa.me/60189131392` 链接 |
| Google Fonts | 字体加载 | `<link>` 标签引入 CDN |
| Email | 客户联系 | `mailto:admin@imago.com.my` |

无第三方 JS 库、无 npm 包、无 API key。

---

## 部署流程

### 方案 A：Cloudflare Pages（推荐，免费）

1. 注册 [Cloudflare](https://dash.cloudflare.com) 账号
2. 将项目文件上传至 GitHub 仓库
3. Cloudflare Pages → Create Project → 连接 GitHub 仓库
4. Build 设置：无需构建命令，输出目录设为 `/`
5. 绑定自定义域名 → 配置 DNS → 自动获取 SSL

### 方案 B：Vercel（免费）

1. 注册 [Vercel](https://vercel.com) 账号
2. 导入 GitHub 仓库
3. Framework Preset 选 "Other"
4. 绑定域名

### 域名购买

| 后缀 | 年费（约） | 推荐注册商 |
|------|----------|-----------|
| `.com` | RM 50-60 | Namecheap, Cloudflare |
| `.com.my` | RM 80-100 | Shinjiru, IP ServerOne |

---

## 上线前检查清单

- [ ] 替换车辆占位图为真实高清照片
- [ ] 替换 Logo 为正式品牌标识
- [ ] Contact 页面嵌入真实 Google Maps iframe
- [ ] 嵌入 Google Analytics 4 追踪代码
- [ ] 提交 sitemap.xml 到 Google Search Console
- [ ] 购买并绑定域名
- [ ] 确认 HTTPS 证书已启用
- [ ] 在各页面测试 WhatsApp 跳转链接
- [ ] 移动端浏览器测试（iOS Safari + Android Chrome）

---

## 维护指南

### 修改内容（文字/价格）

直接编辑对应 HTML 文件，搜索要改的文字，替换保存即可。改完后重新上传到托管平台（或 git push）。

### 添加新服务

1. 在 `services.html` 中复制一个 `service-card` 区块
2. 修改图标、标题、描述
3. 在 `index.html` 首页对应位置同步添加

### 修改配色

编辑 `css/style.css` 顶部的 `:root` 区块中的 CSS 变量值。所有页面会自动同步更改。

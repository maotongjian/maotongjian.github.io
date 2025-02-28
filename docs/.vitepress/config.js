import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "maotongjian",
  description: "My Blog Site",
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/github.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'maotongjian | Frontend Development Insights, Best Practices & Tutorials' }],
    ['meta', { property: 'og:site_name', content: 'maotongjian' }],
    ['meta', { property: 'og:image', content: '' }],
    ['meta', { property: 'og:url', content: 'https://maotongjian.github.io/' }],
  ],
  themeConfig: {
    logo: { src: "/github.svg", width: 24, height: 24 },
    socialLinks: [{ icon: "github", link: "https://github.com/maotongjian" }],
    nav: [
      {
        text: "常用AI工具",
        items: [
          { text: "chatgpt", link: "https://chatgpt.com/" },
          { text: "copilot", link: "https://github.com/copilot/" },
          { text: "cursor", link: "https://www.cursor.com/" },
          { text: "V0", link: "https://v0.dev/chat" },
          { text: "豆包", link: "https://www.doubao.com/chat/" },
          { text: "deepseek", link: "https://www.deepseek.com/" },
        ],
      },
      {
        text: "项目示例",
        items: [
          { text: "gogoalshop", link: "https://www.gogoalshop.se/" },
          { text: "soccerdeal", link: "https://www.soccerdeal.store/" },
          { text: "ijersey", link: "https://www.ijersey.net/" },
          { text: "camisetasfutbol", link: "https://www.camisetasfutbol.mx/" },
          { text: "projerseyshop", link: "https://www.projerseyshop.cn/" },
          { text: "thejerseys", link: "https://www.thejerseys.co/" },
        ],
      },
    ],
    sidebar: [
      {
        text: "文章",
        /* prettier-ignore */
        items: [
          { text: "近期项目总结概述", link: "/project-summary" },
          { text: "后台管理系统重构框架选型分析", link: "/framework-selection" },
        ],
      },
    ],
  },
});

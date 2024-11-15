import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ray's Notes",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'frontend',
        items: [
          { text: 'side effect', link: '/posts/frontend/side-effect' },
          { text: 'reactive', link: '/posts/frontend/reactive' }
        ]
      },
      {
        text: 'backend',
        items: [
          { text: 'log', link: '/posts/backend/log' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ray-D-Song/note' }
    ]
  },
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  }
})

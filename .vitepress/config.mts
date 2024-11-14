import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VitePress Zinc Theme",
  description: "A simple and clean VitePress Zinc theme, inspired by Shadcn",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ray-D-Song/vitepress-zinc-theme' }
    ]
  },
  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  }
})

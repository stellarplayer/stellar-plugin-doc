const { path } = require('@vuepress/utils') 

module.exports = {
    lang: 'zh-CN',
    title: '恒星播放器 - 插件手册',
    description: '',
  
    theme: '@vuepress/theme-default',
    themeConfig: {
      logo: 'logo.png',
      darkMode: false,
      contributors: false,
      lastUpdated: false,
      sidebar: [
        '/intor.md',
        '/getting-started.md',        
        '/layout.md',
        '/control.md',        
        '/event.md',
        '/binding.md',
        '/api.md',
        '/jsapi.md',
        '/sandbox.md',
      ],
    },
    plugins: [
      [
        '@vuepress/plugin-search',
        {
          locales: {
            '/': {
              placeholder: 'Search',
            },
            '/zh/': {
              placeholder: '搜索',
            },
          },
        },
      ],
      [
          '@vuepress/register-components',
          {
              componentsDir: path.resolve(__dirname, './components'),
          },
      ],      
    ],
    extendsMarkdown: md => {
       md.use(require('markdown-it-plantuml'))
    },
  }
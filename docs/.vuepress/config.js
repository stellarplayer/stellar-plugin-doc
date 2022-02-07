const { path } = require('@vuepress/utils') 

module.exports = {
    lang: 'zh-CN',
    title: '恒星播放器 - 插件手册',
    description: '',
  
    theme: '@vuepress/theme-default',
    themeConfig: {
      logo: 'logo.png',
      darkMode: false,
      sidebar: [
        '/intor.md',
        '/getting-started.md',        
        '/layout.md',
        '/control.md',        
        '/event.md',
        '/binding.md',
        '/api.md',
        '/jsapi.md'
      ],
    },
    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ],
        'flowchart'
    ]
  }
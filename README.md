# qwik-theme
This is a development project for an experimental feature module based on the Qwik framework to configure theme colors and enable skin swapping.

## 组织目录结构

src/
  ├── components/        # 组件
  │   ├── common/       # 通用组件
  │   └── features/     # 功能组件
  ├── hooks/            # 自定义 hooks
  ├── contexts/         # Context 定义
  ├── i18n/            # 国际化
  ├── theme/           # 主题配置
  ├── types/           # 类型定义
  └── routes/          # 路由页面
public/
  ├── icons/           # 应用图标
  └── screenshots/     # 应用截图

## 依赖关系

root.tsx
├── hooks/useI18n
│   ├── i18n/index
│   └── contexts/index
├── hooks/useTheme
│   ├── theme/index
│   └── contexts/index
└── components/
    ├── ThemeSwitcher
    │   ├── hooks/useTheme
    │   └── hooks/useI18n
    ├── InstallPWA
    │   └── hooks/useI18n
    └── router-head


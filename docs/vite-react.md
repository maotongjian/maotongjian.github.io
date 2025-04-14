# 记录搭建过程

## 1. 创建项目

- vite docs: https://cn.vite.dev/guide
- template-react-ts: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts

```bash
# npm 7+，需要添加额外的 --;
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install
```

## 2. 配置路由

```bash
# react-router v7.5
# 在 v7 中已经不需要react-router-dom了，可以直接从react-router中导入所有内容
npm install react-router@latest
```

## 3. 配置 eslint

```bash
npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react-hooks --save-dev
```

## 4. 配置 prettier

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

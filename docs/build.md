## 一、创建基于 vite 的 Vue2 项目

```bash
npm create vue@legacy
```

- 与 Vue CLI 的区别
  1. Vite 驱动：Vue CLI 基于 webpack, create vue 基于 Vite
  2. Vite 有更快的启动速度和热更新速度，提升开发体验
  3. 详细：https://cn.vite.dev/guide/why
  4. 脚手架工具：与 Vue CLI 不同，create vue 本身只是一个脚手架工具。它会根据您选择的功能创建一个预配置的项目，然后将其余部分委托给 Vite。通过这种方式可以直接使用与 Rollup 兼容的[Vite 插件生态系统](https://cn.vite.dev/plugins/)

## 二、指定开发服务器端口（--port 端口号）、将本机 IP 地址暴露到局域网访问（--host）

```json
{
  "scripts": {
    "dev": "vite --host --port 3000",
    "build": "vite build",
    "preview": "vite preview --port 8000",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

## 三、启动开发服务器

```bash
# 进入项目目录
cd your-project-name

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 四、统一项目代码风格

```js
// eslint规则检查

/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    semi: ["error", "always"],
    "comma-dangle": [2, "always-multiline"],
    "no-unused-vars": "error",
    "no-dupe-keys": "error",
    "no-undef": "error",
    "no-var": "error",
  },
};

// prettier代码格式化规则
module.exports = {
  semi: true, // 在语句的末尾打印分号
  singleQuote: true, // 使用单引号而不是双引号
  trailingComma: "all", // 多行时，尽可能打印尾随逗号
  printWidth: 150, // 超过最大值换行
  endOfLine: "auto", // 结尾是 \n \r \n\r auto
  overrides: [
    {
      files: "*.{css,scss}",
      options: {
        css: {
          properties: {
            "unit-precision": "ignore", // 忽略单位大小写
          },
        },
      },
    },
  ],
};

// .prettierignore代码格式化忽略
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```

## 五、commit 代码校验

- 在 package.json 中配置 lint-staged 脚本

```json
"lint-staged": {
  "*.{js,vue,cjs,mjs}": [
    "prettier --write",
    "eslint --fix"
  ]
},

```

```bash
# 下载lint-staged开发依赖
npm install lint-staged --save-dev

# 手动执行脚本
npx lint-staged

```

- 结合 husky 使用，在 git 钩子中自动执行

```json
# 在package.json中添加husky配置
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}

```

- 验证上述配置在 git 中自动执行失败，暂不执行 commit 自动格式化和 eslint 修复

## 移动端适配

安装 postcss-pxtorem, 在根目录下配置 postcss.config.js, 设置 html 根字体大小为 10vw，也可通过 JS 监听屏幕的宽度动态设置根字体大小

```js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 36, // 换算基数，根据设计稿的实际尺寸调整
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      exclude: /(node_module)/, // 设置忽略文件，用正则做目录名匹配
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      replace: true, // 是否转换后直接更换属性值
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    },
  },
};
```

## axios 封装

```js
import axios from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里加入 token 或其他需要在请求头中添加的信息
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // 例如：显示加载动画
    // showLoading();
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error("请求错误：", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 请求成功时直接返回响应数据
    return response.data;
  },
  (error) => {
    // 响应错误处理
    if (error.response) {
      // 服务器有返回错误码
      switch (error.response.status) {
        case 401:
          console.error("未授权，请重新登录");
          // 可以执行退出登录、重定向等操作
          break;
        case 404:
          console.error("请求地址不存在");
          break;
        case 500:
          console.error("服务器内部错误");
          break;
        default:
          console.error(
            `请求出错: ${error.response.data.message || "未知错误"}`
          );
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("请求无响应，请检查网络连接");
    } else {
      // 其他错误
      console.error("错误信息：", error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
```

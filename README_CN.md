# Nacosify

<p align="left">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/nacosify">
    <img alt="" src="https://badgen.net/npm/v/nacosify">
  </a>
  <a aria-label="License" href="https://github.com/chakhsu/nacosify/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/nacosify">
  </a>
</p>

[English](./README.md) | [简体中文](./README_CN.md)

本库的目标是用更容易理解和更符合直觉的方式去使用 nacos, 库名取名规则类似 simplify JSON.stringify promisify，故称为 Nacosify。

设计实现：
- 基于官方库二次封装，更加易用性
- 将 namingClient 和 configClient 抽象成一个 client
- 将部分通用的能力放到第一级，服务和配置相关的能力放到第二级
- 简化了函数调用参数，统一了参数命名
- debug 掉了健康检查的日志打印

### 安装

```
npm install nacosify
// or
yarn add nacosify
// or
pnpm add nacosify
```

### 使用

更多使用例子可以查看 [`example.js`](./example.js)

#### 初始化

```
import nacos form 'nacosify'

await nacos.init(addr, namespace, options={})
```

#### 服务注册

```
// 服务注册
await nacos.register(appName, options={})
// 服务注销
await nacos.deregister()
// 优雅退出
await nacos.close()
// 服务注销 & 优雅退出
await nacos.deregisterAndClose()
```

#### 服务发现

```
// 获取服务
await nacos.service.get(name, group)
await nacos.service.getMore(names, group)
// 订阅服务
const reg = { name, group }
nacos.service.subscribe(reg, listener)
nacos.service.unSubscribe(reg, listener)
```

#### 配置中心

```
// 获取配置
await nacos.config.get(id, group, options)
await nacos.config.getMore(ids, group, options)
// 订阅配置
const reg = { id, group }
nacos.config.subscribe(reg, listener)
nacos.config.unSubscribe(reg, listener)
```

### 注意事项

1. 官方的原库的参数是可以直接透传使用，不会有冲突
2. 安装依赖会有一些包版本过低的提示，是官方库的依赖版本太低导致的，不影响使用

### License

根据 MIT 许可证开源。

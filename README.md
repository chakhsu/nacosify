# Nacosify

[English](./README.md) | [简体中文](./README_CN.md)
The goal of this library is to provide a more intuitive and easy-to-understand way of using Nacos. Following the naming convention similar to simplify JSON.stringify and promisify, it is called Nacosify.

Design and implementation:
- Based on the official library, it provides a higher level of usability.
- Abstracts the namingClient and configClient into a single client.
- Places common capabilities at the first level and service and configuration-related capabilities at the second level.
- Simplifies function call parameters and standardizes parameter naming.
- Disables logging for health checks.

### Installation

```
npm install nacosify
// or
yarn add nacosify
// or
pnpm add nacosify
```

### Usage

For more usage examples, refer to [`example.js`](./example.js).

#### Initialization

```
import nacos form 'nacosify'

await nacos.init(addr, namespace, options={})
```

#### Service Registration

```
// registration
await nacos.register(appName, options={})
// deregistration
await nacos.deregister()
// graceful exit
await nacos.close()
// deregistration & graceful exit
await nacos.deregisterAndClose()
```

#### Service Discovery

```
// get service
await nacos.service.get(name, group)
await nacos.service.getMore(names, group)
// subscribe to service
const reg = { name, group }
nacos.service.subscribe(reg, listener)
nacos.service.unSubscribe(reg, listener)
```

#### Configuration Center

```
// get configuration
await nacos.config.get(id, group, options)
await nacos.config.getMore(ids, group, options)
// subscribe to configuration
const reg = { id, group }
nacos.config.subscribe(reg, listener)
nacos.config.unSubscribe(reg, listener)
```

### Notes

1. The parameters of the original official library can be directly passed through without conflicts.
2. Installation dependencies may show some warnings about low package versions. This is due to the low dependency versions of the official library and does not affect usage.

### License

Released under the MIT License.

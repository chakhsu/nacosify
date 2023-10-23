const nacos = require('./index')

const serverList = {
  names: [
    'apigateway-service',
    'rbac-service',
    'user-service',
    'database-service'
  ],
  group: 'MULTI_GROUP'
}

const configList = {
  ids: [
    'mysql_config',
    'Jwt-config',
    'redis_config',
    'system_config',
    'log_config',
    'mongodb_config'
  ]
  // group: 'DEFAULT_GROUP'
}

; (async () => {
  await nacos.init('192.168.31.60:8848', 'chakhsu')

  await nacos.register('nacosTest', {
    ip: '192.168.31.60',
    port: 3663,
    metadata: {
      serverType: 'http'
    }
  })

  // test double register problem
  // await nacos.register('nacosTest', {
  //     ip: '192.168.31.60',
  //     port: 3663,
  //     metadata: {
  //         serverType: 'http'
  //     }
  // })

  const services = await nacos.service.getMore(serverList.names, serverList.group)
  console.log('services', JSON.stringify(services))

  nacos.service.subscribe({
    name: 'nacosTest',
    group: 'DEFAULT_GROUP'
  }, (config) => {
    console.log(config)
  })

  const configs = await nacos.config.getMore(configList.ids, configList.group)
  console.log('configs', JSON.stringify(configs))

  nacos.config.subscribe({
    id: 'mysql_config',
    group: 'DEFAULT_GROUP'
  }, (config) => {
    console.log(config)
  })

  process.on('SIGINT', async () => {
    await nacos.deregisterAndClose()
  })
})()

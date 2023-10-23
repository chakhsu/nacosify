const assert = require('assert')
const Promise = require('bluebird')

const DEFAULT_GROUP = 'DEFAULT_GROUP'

const getReg = (obj) => {
  const { name, group } = obj
  assert(name, 'easy-nacos service subscribe or unsubscribe need name')
  return {
    serviceName: name,
    groupName: group || DEFAULT_GROUP
  }
}

class ServiceSide {
  constructor (client) {
    this.client = client
  }

  async get (name, group = DEFAULT_GROUP) {
    return await this.client.getAllInstances(name, group)
  }

  async getMore (names, group = DEFAULT_GROUP) {
    assert(names && names.length > 0, 'easy-nacos ServiceSide getMore ids array is empty')

    const services = {}

    await Promise.map(names, async name => {
      const instances = await this.get(name, group)
      services[name] = instances.map(instance => {
        const { instanceId, ip, port, weight } = instance
        return { instanceId, ip, port, weight }
      })
    }, { concurrency: 1 })

    return services
  }

  subscribe (obj, listener) {
    const reg = getReg(obj)
    return this.client.subscribe(reg, listener)
  }

  unSubscribe (obj, listener) {
    const reg = getReg(obj)
    return this.client.unSubscribe(reg, listener)
  }
}

module.exports = ServiceSide

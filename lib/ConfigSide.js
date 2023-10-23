const assert = require('assert')
const Promise = require('bluebird')

const DEFAULT_GROUP = 'DEFAULT_GROUP'

const getReg = (obj) => {
  const { id, group } = obj
  assert(id, 'easy-nacos config subscribe or unsubscribe need id')
  return {
    dataId: id,
    group: group || DEFAULT_GROUP
  }
}

class ConfigSide {
  constructor (client) {
    this.client = client
  }

  async get (id, group = DEFAULT_GROUP, options = {}) {
    return await this.client.getConfig(id, group, options)
  }

  async getMore (ids, group = DEFAULT_GROUP, options = {}) {
    assert(ids && ids.length > 0, 'easy-nacos ConfigSide getMore ids array is empty')

    const configs = {}

    await Promise.map(ids, async id => {
      const config = await this.get(id, group, options)
      configs[id] = JSON.parse(config)
    })

    return configs
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

module.exports = ConfigSide

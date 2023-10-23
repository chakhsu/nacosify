const { NacosNamingClient, NacosConfigClient } = require('nacos')
const assert = require('assert')
const debug = require('debug')('easy-nacos')
const ServiceSide = require('./ServiceSide')
const ConfigSide = require('./ConfigSide')

const logger = {
  info: debug,
  warn: debug,
  debug,
  error: debug
}

const getNamingClientConfig = (addr, namespace, options) => {
  return Object.assign({ logger, serverList: addr, namespace }, options)
}

const getConfigClientConfig = (addr, namespace, options) => {
  return Object.assign({ logger, serverAddr: addr, namespace }, options)
}

class Nacos {
  async init (addr, namespace, options = {}) {
    assert(addr && namespace, 'easy-nacos init() params must be addr & namespace')
    const namingClientConfig = getNamingClientConfig(addr, namespace, options)
    const configClientConfig = getConfigClientConfig(addr, namespace, options)

    this._namingClient = new NacosNamingClient(namingClientConfig)
    this._configClient = new NacosConfigClient(configClientConfig)

    await this._namingClient.ready()
    await this._configClient.ready()

    this.service = new ServiceSide(this._namingClient)
    this.config = new ConfigSide(this._configClient)
  }

  async register (appName, options = {}) {
    assert(this._namingClient, 'easy-nacos please first run init()')
    assert(appName, 'easy-nacos register() params must be appName')
    assert(!this.registeredServer, `easy-nacos register error, ${appName} double registered`)
    this.registeredServer = { appName, options }
    await this._namingClient.registerInstance(appName, options)
  }

  async deregister () {
    assert(this._namingClient, 'easy-nacos please first run init()')
    const { appName, options } = this.registeredServer
    await this._namingClient.deregisterInstance(appName, options)
    delete this.registeredServer
  }

  async deregisterAndClose () {
    await this.deregister()
    await this.close()
  }

  async close () {
    this._namingClient.close()
    this._configClient.close()
  }
}

module.exports = new Nacos()

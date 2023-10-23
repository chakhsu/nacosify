declare const _exports: Nacos;
export = _exports;
declare class Nacos {
    init(addr: any, namespace: any, options?: {}): Promise<void>;
    _namingClient: NacosNamingClient;
    _configClient: NacosConfigClient;
    service: ServiceSide;
    config: ConfigSide;
    register(appName: any, options?: {}): Promise<void>;
    registeredServer: {
        appName: any;
        options: {};
    };
    deregister(): Promise<void>;
    deregisterAndClose(): Promise<void>;
    close(): Promise<void>;
}
import { NacosNamingClient } from "nacos-naming";
import { NacosConfigClient } from "nacos-config";
import ServiceSide = require("./ServiceSide");
import ConfigSide = require("./ConfigSide");

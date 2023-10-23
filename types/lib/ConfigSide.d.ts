export = ConfigSide;
declare class ConfigSide {
    constructor(client: any);
    client: any;
    get(id: any, group?: string, options?: {}): Promise<any>;
    getMore(ids: any, group?: string, options?: {}): Promise<{}>;
    subscribe(obj: any, listener: any): any;
    unSubscribe(obj: any, listener: any): any;
}

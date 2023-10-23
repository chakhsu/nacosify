export = ServiceSide;
declare class ServiceSide {
    constructor(client: any);
    client: any;
    get(name: any, group?: string): Promise<any>;
    getMore(names: any, group?: string): Promise<{}>;
    subscribe(obj: any, listener: any): any;
    unSubscribe(obj: any, listener: any): any;
}

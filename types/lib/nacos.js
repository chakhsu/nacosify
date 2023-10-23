var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('nacos'), NacosNamingClient = _a.NacosNamingClient, NacosConfigClient = _a.NacosConfigClient;
var assert = require('assert');
var debug = require('debug')('easy-nacos');
var ServiceSide = require('./ServiceSide');
var ConfigSide = require('./ConfigSide');
var logger = {
    info: debug,
    warn: debug,
    debug: debug,
    error: debug
};
var getNamingClientConfig = function (addr, namespace, options) {
    return Object.assign({ logger: logger, serverList: addr, namespace: namespace }, options);
};
var getConfigClientConfig = function (addr, namespace, options) {
    return Object.assign({ logger: logger, serverAddr: addr, namespace: namespace }, options);
};
var Nacos = /** @class */ (function () {
    function Nacos() {
    }
    Nacos.prototype.init = function (addr, namespace, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var namingClientConfig, configClientConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert(addr && namespace, 'easy-nacos init() params must be addr & namespace');
                        namingClientConfig = getNamingClientConfig(addr, namespace, options);
                        configClientConfig = getConfigClientConfig(addr, namespace, options);
                        this._namingClient = new NacosNamingClient(namingClientConfig);
                        this._configClient = new NacosConfigClient(configClientConfig);
                        return [4 /*yield*/, this._namingClient.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._configClient.ready()];
                    case 2:
                        _a.sent();
                        this.service = new ServiceSide(this._namingClient);
                        this.config = new ConfigSide(this._configClient);
                        return [2 /*return*/];
                }
            });
        });
    };
    Nacos.prototype.register = function (appName, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert(this._namingClient, 'easy-nacos please first run init()');
                        assert(appName, 'easy-nacos register() params must be appName');
                        assert(!this.registeredServer, "easy-nacos register error, ".concat(appName, " double registered"));
                        this.registeredServer = { appName: appName, options: options };
                        return [4 /*yield*/, this._namingClient.registerInstance(appName, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nacos.prototype.deregister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appName, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assert(this._namingClient, 'easy-nacos please first run init()');
                        _a = this.registeredServer, appName = _a.appName, options = _a.options;
                        return [4 /*yield*/, this._namingClient.deregisterInstance(appName, options)];
                    case 1:
                        _b.sent();
                        delete this.registeredServer;
                        return [2 /*return*/];
                }
            });
        });
    };
    Nacos.prototype.deregisterAndClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deregister()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nacos.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._namingClient.close();
                this._configClient.close();
                return [2 /*return*/];
            });
        });
    };
    return Nacos;
}());
module.exports = new Nacos();

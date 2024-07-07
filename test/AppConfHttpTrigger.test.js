"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const AppConfHttpTrigger_1 = require("../src/functions/AppConfHttpTrigger");
// Mock the AppConfigurationClient
vitest_1.vi.mock("@azure/app-configuration", () => ({
    AppConfigurationClient: vitest_1.vi.fn(() => ({
        getConfigurationSetting: vitest_1.vi
            .fn()
            .mockResolvedValue({ value: "mocked-config-value" }),
    })),
}));
(0, vitest_1.describe)("AppConfHttpTrigger", () => {
    const mockRequest = {
        url: "http://localhost:7071/api/AppConfHttpTrigger",
    };
    const mockContext = { log: vitest_1.vi.fn() };
    beforeEach(() => {
        vitest_1.vi.clearAllMocks();
        process.env.APP_CONFIG_CONNECTION_STRING = "mock-connection-string";
        process.env.APP_CONFIG_CONNECTION_key = "mock-connection-key";
    });
    (0, vitest_1.it)("should return the correct response when config is found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { AppConfigurationClient } = yield Promise.resolve().then(() => __importStar(require("@azure/app-configuration")));
        vitest_1.vi.mocked(AppConfigurationClient).mockImplementation(() => ({
            getConfigurationSetting: vitest_1.vi
                .fn()
                .mockResolvedValue({ value: "mocked-config-value" }),
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }));
        const response = yield (0, AppConfHttpTrigger_1.AppConfHttpTrigger)(mockRequest, mockContext);
        (0, vitest_1.expect)(response.body).toBe("Feature flag with effect: Config value: mocked-config-value");
        (0, vitest_1.expect)(mockContext.log).toHaveBeenCalledWith('HTTP function processed request for url "http://localhost:7071/api/AppConfHttpTrigger"');
    }));
    (0, vitest_1.it)("should handle error when fetching configuration", () => __awaiter(void 0, void 0, void 0, function* () {
        const { AppConfigurationClient } = yield Promise.resolve().then(() => __importStar(require("@azure/app-configuration")));
        vitest_1.vi.mocked(AppConfigurationClient).mockImplementation(() => ({
            getConfigurationSetting: vitest_1.vi
                .fn()
                .mockRejectedValue(new Error("Config fetch error")),
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }));
        const response = yield (0, AppConfHttpTrigger_1.AppConfHttpTrigger)(mockRequest, mockContext);
        (0, vitest_1.expect)(response.body).toBe("Feature flag with effect: Config value: Not found");
        (0, vitest_1.expect)(mockContext.log).toHaveBeenCalledWith('HTTP function processed request for url "http://localhost:7071/api/AppConfHttpTrigger"');
    }));
});
//# sourceMappingURL=AppConfHttpTrigger.test.js.map
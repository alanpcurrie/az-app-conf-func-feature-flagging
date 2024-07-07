import type { HttpRequest, InvocationContext } from "@azure/functions";
import { describe, expect, it, vi } from "vitest";
import { AppConfHttpTrigger } from "../src/functions/AppConfHttpTrigger";

// Mock the AppConfigurationClient
vi.mock("@azure/app-configuration", () => ({
	AppConfigurationClient: vi.fn(() => ({
		getConfigurationSetting: vi
			.fn()
			.mockResolvedValue({ value: "mocked-config-value" }),
	})),
}));

describe("AppConfHttpTrigger", () => {
	const mockRequest = {
		url: "http://localhost:7071/api/AppConfHttpTrigger",
	} as HttpRequest;
	const mockContext = { log: vi.fn() } as unknown as InvocationContext;

	beforeEach(() => {
		vi.clearAllMocks();
		process.env.APP_CONFIG_CONNECTION_STRING = "mock-connection-string";
		process.env.APP_CONFIG_CONNECTION_key = "mock-connection-key";
	});

	it("should return the correct response when config is found", async () => {
		const { AppConfigurationClient } = await import("@azure/app-configuration");
		vi.mocked(AppConfigurationClient).mockImplementation(
			() =>
				({
					getConfigurationSetting: vi
						.fn()
						.mockResolvedValue({ value: "mocked-config-value" }),
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				}) as any,
		);

		const response = await AppConfHttpTrigger(mockRequest, mockContext);

		expect(response.body).toBe(
			"Feature flag with effect: Config value: mocked-config-value",
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'HTTP function processed request for url "http://localhost:7071/api/AppConfHttpTrigger"',
		);
	});

	it("should handle error when fetching configuration", async () => {
		const { AppConfigurationClient } = await import("@azure/app-configuration");
		vi.mocked(AppConfigurationClient).mockImplementation(
			() =>
				({
					getConfigurationSetting: vi
						.fn()
						.mockRejectedValue(new Error("Config fetch error")),
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				}) as any,
		);

		const response = await AppConfHttpTrigger(mockRequest, mockContext);

		expect(response.body).toBe(
			"Feature flag with effect: Config value: Not found",
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			'HTTP function processed request for url "http://localhost:7071/api/AppConfHttpTrigger"',
		);
	});
});

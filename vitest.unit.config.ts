import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config";
/// <reference types="vitest" />

export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			includeSource: ["src/**/*.{js,ts}"],
			exclude: [
				...configDefaults.exclude,
				"**/*.e2e-{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			],
		},
	}),
);

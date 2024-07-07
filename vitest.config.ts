import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	define: {
		"import.meta.vitest": "undefined",
	},
	test: {
		globals: true,
		setupFiles: "./vitest-setup.ts",
	},
	plugins: [tsconfigPaths()],
});

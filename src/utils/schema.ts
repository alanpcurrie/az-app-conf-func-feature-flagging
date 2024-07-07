import * as Schema from "@effect/schema/Schema";
import * as Config from "effect/Config";
import * as ConfigError from "effect/ConfigError";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";

const connectionStringSchema = Schema.String.pipe(
	Schema.filter((s: string) => s.startsWith("Endpoint="), {
		message: () => "Connection string must start with 'Endpoint='",
	}),
);

const EnvSchema = Schema.Struct({
	NODE_ENV: Schema.Union(
		Schema.Literal("development"),
		Schema.Literal("production"),
		Schema.Literal("test"),
	),
	PORT: Schema.Number,
	API_KEY: Schema.String,
	APP_CONFIG_CONNECTION_STRING: connectionStringSchema,
	APP_CONFIG_CONNECTION_KEY: Schema.String,
});

// Create a Config for each environment variable
const envConfig = Config.all({
	NODE_ENV: Config.string("NODE_ENV"),
	PORT: Config.number("PORT"),
	API_KEY: Config.string("API_KEY"),
	APP_CONFIG_CONNECTION_STRING: Config.string("APP_CONFIG_CONNECTION_STRING"),
	APP_CONFIG_CONNECTION_KEY: Config.string("APP_CONFIG_CONNECTION_KEY"),
});

// Validate the configuration using the schema
const validatedConfig = pipe(
	envConfig,
	Effect.flatMap((config) => Schema.decodeUnknown(EnvSchema)(config)),
);

// Use the validated config in your application
// const programWIthGenerator = Effect.gen(function* (_) {
// 	const env = yield* validatedConfig;
// 	console.log("Validated environment:", env);
// });

const programWIthPipe = pipe(
	validatedConfig,
	Effect.map((env) => {
		console.log("Validated environment:", env);
		return env;
	}),
);

// Run the program
const runProgram = pipe(
	programWIthPipe,
	Effect.match({
		onSuccess: () => console.log("Configuration validated successfully"),
		onFailure: (error) =>
			ConfigError.isConfigError(error)
				? console.error("Configuration error:", ConfigError.toString())
				: console.error("Unexpected error:", error),
	}),
);

Effect.runPromise(runProgram);

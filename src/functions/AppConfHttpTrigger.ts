import { AppConfigurationClient } from "@azure/app-configuration";
import { app } from "@azure/functions";
import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";
// import { metrics, trace } from "@opentelemetry/api";
import logsAPI from "@opentelemetry/api-logs";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { Resource } from "@opentelemetry/resources";
import { SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
	SEMRESATTRS_SERVICE_NAME,
	SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import * as dotenv from "dotenv";
import { Console, Effect, pipe } from "effect";
// import { sdk } from "../utils/aspire-o11y";

type AppConfig = {
	readonly client: AppConfigurationClient;
};

dotenv.config();
const CONNECTION_STRING = process.env.APP_CONFIG_CONNECTION_STRING ?? "";
const CONNECTION_KEY = process.env.APP_CONFIG_CONNECTION_key ?? "";

const sdk = new NodeSDK({
	resource: new Resource({
		[SEMRESATTRS_SERVICE_NAME]: "aspire-o11y-server",
		[SEMRESATTRS_SERVICE_VERSION]: "0.1.0",
	}),
	logRecordProcessor: new SimpleLogRecordProcessor(new OTLPLogExporter()),
	traceExporter: new OTLPTraceExporter(),
	metricReader: new PeriodicExportingMetricReader({
		exporter: new OTLPMetricExporter(),
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
// const tracer = trace.getTracer("aspire-o11y-server", "0.1.0");
// const meter = metrics.getMeter("aspire-o11y-server", "0.1.0");
const logger = logsAPI.logs.getLogger("aspire-o11y-server");

const initAppConfigClient = (connectionString: string): AppConfig => ({
	client: new AppConfigurationClient(connectionString),
});

const getConfig =
	(appConfig: AppConfig) =>
	(key: string): Promise<string | null> => {
		Console.log("Client Initialized:", !!appConfig.client);
		return Effect.runPromise(
			pipe(
				Effect.tryPromise(() =>
					appConfig.client.getConfigurationSetting({ key }),
				),
				Effect.map((response) => response.value ?? null),
				Effect.catchAll((error) => {
					Console.error("Error fetching configuration:", error);
					return Effect.succeed(null);
				}),
				Effect.tap((value) => {
					if (value === null) Console.log("No Config Found");
					return value;
				}),
			),
		);
	};

export async function AppConfHttpTrigger(
	request: HttpRequest,
	context: InvocationContext,
): Promise<HttpResponseInit> {
	logger.emit({
		severityNumber: logsAPI.SeverityNumber.INFO,
		severityText: "INFO",
		body: "Hi from Otel in Azure funcs",
		attributes: { "log.type": "LogRecord" },
	});
	context.log(`HTTP function processed request for url "${request.url}"`);
	const appConfig = initAppConfigClient(CONNECTION_STRING);
	const fetchConfig = getConfig(appConfig);
	const configValue = await fetchConfig(CONNECTION_KEY);

	return {
		body: `Feature flag with effect: Config value: ${configValue ?? "Not found"}`,
	};
}

app.http("AppConfHttpTrigger", {
	methods: ["GET", "POST"],
	authLevel: "anonymous",
	handler: AppConfHttpTrigger,
});

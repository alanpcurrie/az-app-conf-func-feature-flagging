import { AppConfigurationClient } from "@azure/app-configuration";
import {
	type HttpHandler,
	type HttpRequest,
	type HttpResponse,
	type InvocationContext,
	app,
} from "@azure/functions";
import * as df from "durable-functions";
import type {
	ActivityHandler,
	OrchestrationContext,
	OrchestrationHandler,
} from "durable-functions";

const activityName = "CheckFeatureFlag";

// Orchestrator function
const FeatureFlagOrchestrator: OrchestrationHandler = function* (
	context: OrchestrationContext,
) {
	const featureFlags = ["betaFeature", "newUIEnabled", "dataProcessingV2"];
	const outputs = [];

	for (const flag of featureFlags) {
		outputs.push(yield context.df.callActivity(activityName, flag));
	}

	return outputs;
};

df.app.orchestration("FeatureFlagOrchestrator", FeatureFlagOrchestrator);

// Activity function to check a single feature flag
const CheckFeatureFlag: ActivityHandler = async (
	flagName: string,
): Promise<{ flagName: string; isEnabled: boolean }> => {
	const connectionString = process.env.APP_CONFIG_CONNECTION_STRING;
	if (!connectionString) {
		throw new Error("APP_CONFIG_CONNECTION_STRING is not set");
	}

	const client = new AppConfigurationClient(connectionString);
	const { value } = await client.getConfigurationSetting({
		key: `.appconfig.featureflag/${flagName}`,
	});

	const isEnabled = value ? JSON.parse(value).enabled : false;
	return { flagName, isEnabled };
};

df.app.activity(activityName, { handler: CheckFeatureFlag });

// HTTP starter function
const FeatureFlagHttpStart: HttpHandler = async (
	request: HttpRequest,
	context: InvocationContext,
): Promise<HttpResponse> => {
	const client = df.getClient(context);
	const instanceId: string = await client.startNew("FeatureFlagOrchestrator");

	context.log(`Started orchestration with ID = '${instanceId}'.`);
	return client.createCheckStatusResponse(request, instanceId);
};

app.http("FeatureFlagHttpStart", {
	route: "checkFeatureFlags",
	extraInputs: [df.input.durableClient()],
	handler: FeatureFlagHttpStart,
});

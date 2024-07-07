import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

export const server = setupServer(
	http.post("http://localhost:7071/api/AppConfHttpTrigger", () => {
		return HttpResponse.json({ key: "mock-value" });
	}),
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

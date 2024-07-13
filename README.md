
![Logo](logo.webp)

## Overview
**feature-flag-poc** is an Azure Function-based proof of concept for implementing feature flagging using Azure App Configuration. This project uses TypeScript and integrates with OpenTelemetry for observability.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Function Details](#function-details)
- [Commitizen and Commitlint](#commitizen-and-commitlint)

```sh
  Project_structure
  ├── dist
  │ └── src
  │ ├── functions
  │ └── utils
  ├── terraform
  ├── src
  │ ├── functions
  │ └── utils
  ├── azurite_config
  └── project_config
```

## Installation
1. Clone the repository:
```sh
   git clone <repository-url>
   cd feature-flag-poc
   ```
2. Install the dependencies:
```sh
   pnpm install
   ```

## Usage
1. Build the project:
 ```sh
   pnpm run build
  ```
2. Start the Azure Function locally:
```sh
   pnpm start
   ```

## Scripts
- **build**: Compiles TypeScript files to JavaScript.
```sh
  pnpm run build
  ```
- **watch**: Compiles TypeScript files in watch mode.
 ```sh
  pnpm run watch
  ```
- **clean**: Removes the `dist` directory.
```sh
  pnpm run clean
 ```
- **prestart**: Cleans and builds the project before starting.
  ```sh
  pnpm run prestart
  ```
- **start**: Starts the Azure Function.
 ```sh
  pnpm start
  ```
- **test**: Placeholder for test command.
```sh
  pnpm run test
  ```
 **commit**: Use Commitizen for standardized commit messages.
  ```sh
  pnpm run commit
  ```

## Environment Variables
Create a `.env` file in the root directory and add your Azure App Configuration connection string:
```env
AZURE_APP_CONFIG_CONNECTION_STRING=Endpoint=https://tech-radar-v2-feature-app-config.azconfig.io;Id=xxx
```

## Dependencies
- `@azure/app-configuration`: ^1.6.0
- `@azure/functions`: ^4.0.0-alpha.9
- `@effect/schema`: ^0.68.9
- `@opentelemetry/api`: ^1.9.0
- `@opentelemetry/api-logs`: ^0.52.1
- `@opentelemetry/auto-instrumentations-node`: ^0.47.1
- `@opentelemetry/exporter-logs-otlp-grpc`: ^0.52.1
- `@opentelemetry/exporter-metrics-otlp-grpc`: ^0.52.1
- `@opentelemetry/exporter-trace-otlp-grpc`: ^0.52.1
- `@opentelemetry/resources`: ^1.25.1
- `@opentelemetry/sdk-logs`: ^0.52.1
- `@opentelemetry/sdk-metrics`: ^1.25.1
- `@opentelemetry/sdk-node`: ^0.52.1
- `@opentelemetry/sdk-trace-node`: ^1.25.1
- `@opentelemetry/semantic-conventions`: ^1.25.1
- `dotenv`: ^16.4.5
- `durable-functions`: 3.0.0-alpha.5
- `effect`: ^3.4.0

## Dev Dependencies
- `@biomejs/biome`: 1.8.2
- `@commitlint/cli`: ^19.3.0
- `@types/node`: ^20.14.8
- `azure-functions-core-tools`: ^4.x
- `commitizen`: ^4.3.0
- `cz-emoji-conventional`: ^1.0.2
- `msw`: ^2.3.1
- `rimraf`: ^5.0.0
- `typescript`: ^5.5.0
- `vitest`: ^1.6.0

## Function Details
### AppConfHttpTrigger
An Azure Function HTTP trigger that fetches a feature flag from Azure App Configuration and returns its value.

## Using Azurite in VSCode to Work with Azure Functions Locally

To work with Azure Functions and Azure Storage locally, you can use Azurite, an open-source emulator for Azure Storage. Here's a guide to setting it up and integrating it with your Azure Functions project.

#### Prerequisites
- Visual Studio Code
- Node.js
- Azure Functions Core Tools
- Azurite extension for Visual Studio Code

#### Step-by-Step Guide

1. **Install Azurite Extension in VSCode**:
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window.
   - Search for `Azurite` and install it.

2. **Start Azurite**:
   - After installation, you can start Azurite by opening the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and typing `Azurite: Start`.
   - You should see Azurite starting in the Terminal window with logs indicating that the Blob, Queue, and Table services are running.

3. **Configure Azure Function to Use Azurite**:
   - Open your Azure Functions project in VSCode.
   - Create or update the `local.settings.json` file to configure your Azure Functions to use the Azurite emulator. Ensure your `local.settings.json` file looks like this:
     ```json
     {
       "IsEncrypted": false,
       "Values": {
         "AzureWebJobsStorage": "UseDevelopmentStorage=true",
         "FUNCTIONS_WORKER_RUNTIME": "node",
         "APP_CONFIG_CONNECTION_STRING": "YourAppConfigConnectionString"
       }
     }
     ```
   - `UseDevelopmentStorage=true` tells your function app to use the local Azurite storage emulator.

4. **Create a Storage Account in Azurite**:
   - Azurite will automatically handle storage account creation. You just need to use the connection string `UseDevelopmentStorage=true`.

5. **Develop and Test Azure Functions Locally**:
   - With Azurite running, you can now develop and test your Azure Functions locally as if you were using actual Azure Storage.
   - Use the Azure Functions Core Tools to start your function app locally:
     ```sh
     func start
     ```
   - Your functions will interact with the local storage emulator instead of the cloud.

6. **Check Azurite Data**:
   - You can view and manage your Azurite data using tools like `Azure Storage Explorer` or directly within Visual Studio Code if you have the `Azure Storage` extension installed.
   - Connect to `http://127.0.0.1:10000/devstoreaccount1` to view the storage account contents.

### Aspire Dashboard

```sh
 docker run --rm -it -p 18888:18888 -p 4317:18889 -d --name aspire-dashboard \
    mcr.microsoft.com/dotnet/aspire-dashboard:8.0.0
```

### Notes:
- **Azurite Ports**: By default, Azurite listens on the following ports:
  - Blob service: `10000`
  - Queue service: `10001`
  - Table service: `10002`
  - Ensure these ports are not being used by other services on your machine.
  
- **Environment Variables**: Make sure that your local environment variables and `local.settings.json` are correctly configured to match your development needs.

By following these steps, you can set up a local development environment for Azure Functions using Azurite in Visual Studio Code, allowing you to develop and test your functions without needing access to cloud resources.

- Replace `<repository-url>` with the actual repository URL.
- Ensure that the Azure App Configuration connection string is correctly set in the `.env` file.
- This function can be tested locally using Azure Functions Core Tools.

## Future Enhancements
- Implement test cases using `vitest`.
- Integrate full OpenTelemetry observability.
- Integrate [Aspire dashboard](https://aspiredashboard.com) for local observability.
- Add more comprehensive error handling and logging.
- Set up Infrastructure as Code (IaC) with Terraform.

## Commitizen and Commitlint

### Commitizen
This project uses Commitizen to standardize commit messages. To make a commit, run:

```sh
pnpm run commit
```
This will prompt you to fill out a standardized commit message.

### Commitlint
Commitlint checks if your commit messages meet the conventional commit format. It is configured to work with Commitizen.

### Configuration
The configuration for Commitizen and Commitlint is specified in the `package.json` file:

```json
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-emoji-conventional"
    }
  }
}
```


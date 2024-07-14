
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

### Core Dependencies

- **@azure/app-configuration**: Used for managing application settings and feature flags in Azure.
- **@azure/functions**: Provides support for creating Azure Functions, enabling serverless computing.
- **@effect/schema**: Utilized for data validation and schema definitions.
- **@opentelemetry/api, @opentelemetry/sdk-* and related packages**: These packages are part of the OpenTelemetry suite, which we use for tracing, logging, and metrics collection to monitor application performance and behavior.
- **dotenv**: Loads environment variables from a `.env` file, for managing configuration settings securely.
- **durable-functions**: Enables the creation of stateful workflows within Azure Functions.
- **effect**: A functional programming library for building applications with a focus on effect management.

### Core Development Dependencies

- **@biomejs/biome**: Provides a comprehensive toolkit for managing and maintaining code quality, including linting and formatting.
- **@commitlint/cli**: Helps enforce consistent commit messages across the project.
- **azure-functions-core-tools**: CLI tools for developing, running, and deploying Azure Functions locally.
- **commitizen**: Assists in creating standardized commit messages, improving readability and project history.
- **cz-emoji-conventional**: An adapter for Commitizen that adds emojis to commit messages following the conventional commits specification.
- **msw**: Mock Service Worker for API mocking, facilitating testing and development.
- **typescript**: The primary language for our project, providing type safety and modern JavaScript features.
- **vitest**: A fast unit testing framework that is powereed by Vite.

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


output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.sa.name
}

output "app_service_plan_name" {
  value = azurerm_service_plan.asp.name
}

output "function_app_name" {
  value = azurerm_linux_function_app.function.name
}

output "app_configuration_name" {
  value = azurerm_app_configuration.appconfig.name
}

output "app_configuration_connection_string" {
  value     = azurerm_app_configuration.appconfig.primary_read_key[0].connection_string
  sensitive = true
}

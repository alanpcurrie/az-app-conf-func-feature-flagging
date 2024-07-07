# variable "location" {
#   description = "Azure region to deploy resources"
#   default     = "West Europe"
# }

# variable "resource_group_name" {
#   description = "Name of the resource group"
#   default     = "rg-feature-flag-poc"
# }

# variable "storage_account_name" {
#   description = "Name of the storage account"
#   default     = "saflagpoc"
# }

# variable "app_service_plan_name" {
#   description = "Name of the App Service Plan"
#   default     = "asp-feature-flag-poc"
# }

# variable "function_app_name" {
#   description = "Name of the Function App"
#   default     = "function-feature-flag-poc"
# }

# variable "app_configuration_name" {
#   description = "Name of the App Configuration"
#   default     = "appconfig-feature-flag-poc"
# }

locals {
  app_configuration_name = "appconfig-feature-flag-poc"
  function_app_name      = "function-feature-flag-poc"
  app_service_plan_name  = "asp-feature-flag-poc"
  storage_account_name   = "saflagpoc"
  resource_group_name    = "rg-feature-flag-poc"
  location               = "West Europe"
}